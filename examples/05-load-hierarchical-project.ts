/**
 * Example 5: load a full hierarchical schematic project (a top sheet plus
 * several sub-sheets) via KicadProject, and print a rolled-up BOM.
 *
 * KicadProject doesn't do any file I/O itself - you hand it a `loadFile`
 * function and a `PathUtils` implementation, so it works the same whether
 * the files live on local disk (as here), in a browser File System Access
 * handle, in an Electron renderer, etc.
 *
 * Run: yarn install && yarn 05
 */
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { KicadProject } from '../src/Project/KicadProject';
import type { PathUtils } from '../src/Project/PathUtils';

const projectDir = fileURLToPath(new URL('./sample-data/hierarchical-project/', import.meta.url));

// Node's own `path` module already implements the small PathUtils surface
// KicadProject needs (dirname/resolve/join/basename/extname/isAbsolute).
const nodePathUtils: PathUtils = {
	dirname: (p) => path.dirname(p),
	resolve: (...p) => path.resolve(...p),
	join: (...p) => path.join(...p),
	basename: (p, ext) => path.basename(p, ext),
	extname: (p) => path.extname(p),
	isAbsolute: (p) => path.isAbsolute(p)
};

const loadFile = (filePath: string) => readFile(filePath, 'utf-8');

async function main() {
	const project = new KicadProject();
	await project.loadFromPath(
		loadFile,
		nodePathUtils,
		path.join(projectDir, 'DevKitX2-Castellated6L.kicad_sch')
	);

	console.log(`Top sheet: ${ project.mainSchematic!.name || '(root)' }`);
	console.log('Sub-sheets:', project.mainSchematic!.sheets.map(s => s.name).join(', '));

	// `recursive: true` walks into every loaded sub-sheet too.
	const bom = project.mainSchematic!.getBOM(true);

	console.log(`\nBOM (${ bom.length } line items):\n`);
	for (const item of bom) {
		console.log(`  ${ item.Reference.padEnd(24) } x${ item.Qty }  ${ item.Value }`);
	}
}

main();
