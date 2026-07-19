import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';
import { KicadElementSetup, KicadElementStackup } from '../src/KicadElementSetup';
import { KicadElementSymbol } from '../src/KicadElementSymbol';

const dir = path.join(__dirname, 'fixtures', 'kicad-qa');

function parseFixture(relPath: string) {
	const data = readFileSync(path.join(dir, relPath), 'utf-8');
	const root = new KicadParser().parse(data);
	return { data, root };
}

/**
 * Collapses whitespace so pretty-printed output can be compared against
 * source that may use different (but semantically equivalent) formatting.
 */
function normalize(s: string): string {
	return s.replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim();
}

describe('KiCad QA/regression fixtures (from gitlab.com/kicad/code/kicad qa/data)', () => {
	it.each([
		'eeschema/api_kitchen_sink.kicad_sch',
		'eeschema/nested_groups.kicad_sch',
		'eeschema/legacy_hierarchy.kicad_sch',
		'eeschema/ampli_ht.kicad_sch',
		'pcbnew/net_tie_drc.kicad_pcb',
		'pcbnew/oval_teardrop.kicad_pcb',
		'pcbnew/teardrop_close_via.kicad_pcb',
		'pcbnew/duplicated_stackup.kicad_pcb',
		'pcbnew/corrupted_stackup.kicad_pcb'
	])('parses %s without throwing', (file) => {
		const { root } = parseFixture(file);
		expect(root.children.length).toBeGreaterThan(0);
	});

	it('parses the "api_kitchen_sink" board, KiCad\'s own broad-coverage fixture', () => {
		const { root } = parseFixture('pcbnew/api_kitchen_sink.kicad_pcb');
		expect(root.name).toBe('kicad_pcb');

		// This particular fixture doesn't define an explicit layer stackup
		// (no board-fabrication-specific test data), just confirm setup parses.
		const setup = root.findFirstChildByClass(KicadElementSetup);
		expect(setup).toBeDefined();
	});

	it('parses an explicit layer stackup from the DevKitX2 board fixture', () => {
		const { root } = parseFixture('../gigaesc/DevKitX2-Castellated6L.kicad_pcb');
		const setup = root.findFirstChildByClass(KicadElementSetup);
		expect(setup!.getStackup()).toBeInstanceOf(KicadElementStackup);
	});

	it('parses the "api_kitchen_sink" schematic, KiCad\'s own broad-coverage fixture', () => {
		const { root } = parseFixture('eeschema/api_kitchen_sink.kicad_sch');
		expect(root.name).toBe('kicad_sch');
	});

	it('parses both intentionally-broken stackup regression fixtures without crashing', () => {
		// These reproduce specific upstream bug reports (corrupted/duplicated
		// stackup blocks) - the point is that our tolerant parser survives them.
		expect(() => parseFixture('pcbnew/corrupted_stackup.kicad_pcb')).not.toThrow();
		expect(() => parseFixture('pcbnew/duplicated_stackup.kicad_pcb')).not.toThrow();
	});

	it('parses KiCad\'s official Device.kicad_sym stock library end-to-end', () => {
		const { root } = parseFixture('libraries/Device.kicad_sym');
		expect(root.name).toBe('kicad_symbol_lib');

		const symbols = root.findChildrenByClass(KicadElementSymbol);
		expect(symbols.length).toBeGreaterThan(500);
	});

	it('parses KiCad\'s official power.kicad_sym library end-to-end', () => {
		const { root } = parseFixture('libraries/power.kicad_sym');
		expect(root.name).toBe('kicad_symbol_lib');
		expect(root.findChildrenByClass(KicadElementSymbol).length).toBeGreaterThan(20);
	});

	it.each([
		'eeschema/nested_groups.kicad_sch',
		'pcbnew/net_tie_drc.kicad_pcb',
		'pcbnew/oval_teardrop.kicad_pcb',
		'pcbnew/teardrop_close_via.kicad_pcb'
	])('round-trips %s (modulo whitespace and known fixed-precision formatting)', (file) => {
		const { data, root } = parseFixture(file);
		const written = normalize(root.write());
		let expected = normalize(data);

		// KicadElementNumericFixed (dashed_line_dash_ratio/gap_ratio) always
		// writes 6 decimal places; source files may use fewer. Cosmetic only.
		expected = expected
			.replace(/\(dashed_line_dash_ratio 12\)/, '(dashed_line_dash_ratio 12.000000)')
			.replace(/\(dashed_line_gap_ratio 3\)/, '(dashed_line_gap_ratio 3.000000)');

		expect(written).toBe(expected);
	});

	it('NOT A KICAD 10 CONCERN: KiCad 8.0\'s bare trailing-flag pin_names form reorders on write', () => {
		// KiCad 8.0's symbol editor (Device.kicad_sym/power.kicad_sym, generator_version
		// "8.0") sometimes wrote `(pin_names (offset 0.0254) hide)` - a bare "hide"
		// attribute positioned *after* the (offset) child. KicadElement stores
		// attributes and children in separate arrays and write() always emits all
		// attributes before all children, so this specific interleaving does not
		// round-trip byte-for-byte (the flag survives, just repositioned).
		//
		// Confirmed irrelevant to KiCad 10, our actual target: grepping every KiCad
		// 10 fixture we have (GigaESC + api_kitchen_sink, generator_version "10.0")
		// turns up zero occurrences of this pattern. KiCad 10 always writes hide as
		// a proper `(hide yes)` child element instead of a bare trailing symbol:
		//
		//   (pin_names
		//       (offset 0)
		//       (hide yes)
		//   )
		//
		// - both offset and hide are children there, and write() already preserves
		// child order faithfully, so there's no interleaving problem in KiCad 10.
		const input = '(pin_names (offset 0.0254) hide)';
		const parser = new KicadParser();
		const root = parser.parse(input);

		expect(normalize(root.write())).toBe('(pin_names hide (offset 0.0254) )'.replace(/\s+\)/g, ')'));
	});
});
