/**
 * Standalone, opt-in round-trip check against a real KiCad project living
 * anywhere on disk - deliberately NOT pulled into the repo as a fixture,
 * since the whole point is to point this at whatever large/advanced
 * third-party projects you happen to have checked out locally.
 *
 * For every .kicad_sch / .kicad_pcb / .kicad_sym / .kicad_mod file found
 * (recursively) under KICAD_DIFF_PROJECT_DIR, this reads it, parses it,
 * writes it back out, and reports a text diff between input and output.
 *
 * Skipped entirely if the env var isn't set - no failure, no dependency on
 * any particular machine having the folder.
 *
 * Usage (bash):
 *   KICAD_DIFF_PROJECT_DIR="C:/Projects/Personal/hackrf/hardware/hackrf-one" yarn vitest run externalProjectDiff.test.ts
 *
 * Usage (PowerShell):
 *   $env:KICAD_DIFF_PROJECT_DIR = "C:\Projects\Personal\hackrf\hardware\hackrf-one"
 *   yarn vitest run externalProjectDiff.test.ts
 *
 * A per-file report is written to test/output/external-project-diff/
 * (gitignored) for anything that doesn't round-trip byte-for-byte, since
 * console output gets unwieldy fast across a whole project.
 *
 * Computing a full line-by-line diff (jsdiff's Myers algorithm) is
 * polynomial in the *edit distance*, not just file size - a large file with
 * a divergence near the top (e.g. one field's quoting differs, shifting
 * every byte after it) can make a full diff take minutes even at a few MB.
 * So above DIFF_SIZE_THRESHOLD we skip the expensive diff entirely and just
 * report the first divergence point plus both raw files, for external
 * diffing with a real diff tool.
 */
import { readFileSync, readdirSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { createTwoFilesPatch, diffLines } from 'diff';
import { KicadParser } from '../src/KicadParser';

const projectDir = process.env.KICAD_DIFF_PROJECT_DIR;
const extensions = ['.kicad_sch', '.kicad_pcb', '.kicad_sym', '.kicad_mod'];
const outputDir = path.join(__dirname, 'output', 'external-project-diff');
const DIFF_SIZE_THRESHOLD = 200_000; // chars; see note above
const HARD_SIZE_CAP = 2_000_000; // never attempt a full diff above this, regardless of similarity

function findKicadFiles(root: string): string[] {
	return readdirSync(root, { recursive: true, withFileTypes: true })
		.filter(entry => entry.isFile() && extensions.includes(path.extname(entry.name)))
		.map(entry => path.join(entry.parentPath ?? (entry as any).path, entry.name));
}

function firstDivergence(a: string, b: string): { index: number, before: string, after: string } {
	let i = 0;
	const len = Math.min(a.length, b.length);
	while (i < len && a[i] === b[i]) {
		i++;
	}
	return {
		index: i,
		before: a.slice(Math.max(0, i - 100), i + 150),
		after: b.slice(Math.max(0, i - 100), i + 150)
	};
}

interface FileResult {
	file: string;
	status: 'match' | 'diff' | 'parse-error';
	linesChanged?: number;
	error?: unknown;
}

(projectDir ? describe : describe.skip)(`external project round-trip: ${ projectDir }`, () => {
	it('reads every KiCad file, writes it back out, and reports the diff', () => {
		if (!projectDir) {
			return;
		}

		const files = findKicadFiles(projectDir);
		console.log(`Found ${ files.length } KiCad file(s) under ${ projectDir }`);
		expect(files.length).toBeGreaterThan(0);

		rmSync(outputDir, { recursive: true, force: true });
		mkdirSync(outputDir, { recursive: true });

		const results: FileResult[] = [];

		for (const file of files) {
			const relPath = path.relative(projectDir, file);
			const outBase = path.join(outputDir, relPath.replace(/[\\/]/g, '__'));

			let original: string;
			try {
				original = readFileSync(file, 'utf-8');
			}
			catch (error) {
				results.push({ file: relPath, status: 'parse-error', error });
				continue;
			}

			let written: string;
			try {
				const root = new KicadParser().parse(original);
				written = root.write() + '\n';
			}
			catch (error) {
				results.push({ file: relPath, status: 'parse-error', error });
				console.error(`PARSE ERROR in ${ relPath }:`, error);
				continue;
			}

			if (written.trim() === original.trim()) {
				results.push({ file: relPath, status: 'match' });
				continue;
			}

			// jsdiff's cost is driven by edit distance, not raw size - a large but
			// near-identical file is cheap to diff, while a large file that diverges
			// early (shifting everything after it) is what actually caused the hang
			// this guard exists for. Use the length delta as a cheap proxy for edit
			// distance, but never attempt a full diff above HARD_SIZE_CAP regardless.
			const isLarge = original.length > DIFF_SIZE_THRESHOLD || written.length > DIFF_SIZE_THRESHOLD;
			const lengthDeltaRatio = Math.abs(written.length - original.length) / Math.max(original.length, 1);
			const looksLikelySmallEdit = lengthDeltaRatio < 0.02;

			if (Math.max(original.length, written.length) > HARD_SIZE_CAP || (isLarge && !looksLikelySmallEdit)) {
				// Too large/divergent for a full diff to be safe - report the
				// first divergence and dump both raw files for external diffing.
				const div = firstDivergence(original, written);
				results.push({ file: relPath, status: 'diff' });
				writeFileSync(outBase + '.original.txt', original);
				writeFileSync(outBase + '.written.txt', written);
				writeFileSync(
					outBase + '.summary.txt',
					`Skipped full diff (${ original.length } -> ${ written.length } chars, too large/divergent to diff safely).\n` +
					`First divergence at char ${ div.index }:\n\n` +
					`ORIGINAL: ${ div.before }\n\n` +
					`WRITTEN : ${ div.after }\n\n` +
					`Full original/written text dumped alongside this file for external diffing\n` +
					`(e.g. \`git diff --no-index ${ path.basename(outBase) }.original.txt ${ path.basename(outBase) }.written.txt\`).\n`
				);
				continue;
			}

			const changes = diffLines(original, written);
			const linesChanged = changes
				.filter(c => c.added || c.removed)
				.reduce((sum, c) => sum + (c.count ?? 0), 0);

			results.push({ file: relPath, status: 'diff', linesChanged });

			const patch = createTwoFilesPatch(
				`a/${ relPath }`, `b/${ relPath }`, original, written,
				'original (parsed input)', 'written (parser output)'
			);
			writeFileSync(outBase + '.diff', patch);
		}

		const matches = results.filter(r => r.status === 'match');
		const diffs = results.filter(r => r.status === 'diff');
		const parseErrors = results.filter(r => r.status === 'parse-error');

		console.log(`\n${ matches.length }/${ results.length } files round-tripped byte-for-byte.`);

		if (diffs.length > 0) {
			console.log(`\n${ diffs.length } file(s) with differences (see test/output/external-project-diff/):`);
			for (const d of diffs.sort((a, b) => (b.linesChanged ?? 0) - (a.linesChanged ?? 0))) {
				const label = d.linesChanged !== undefined ? `${ d.linesChanged } line(s) changed` : 'too large for full diff';
				console.log(`  ${ label.padStart(24) }  ${ d.file }`);
			}
		}

		if (parseErrors.length > 0) {
			console.log(`\n${ parseErrors.length } file(s) failed to parse:`);
			for (const e of parseErrors) {
				console.log(`  ${ e.file }: ${ e.error }`);
			}
		}

		// Diffs are informational (some cosmetic formatting differences are
		// known and accepted - see kicadQaFixtures.test.ts). Parse errors are not.
		expect(parseErrors).toEqual([]);
	}, 120_000);
});
