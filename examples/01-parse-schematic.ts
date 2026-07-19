/**
 * Example 1: parse a .kicad_sch file and list its symbols.
 *
 * Run: yarn install && yarn 01
 */
import { readFileSync } from 'fs';
import { KicadParser } from '../src/KicadParser';
import { KicadElementSymbol } from '../src/KicadElementSymbol';

const data = readFileSync(new URL('./sample-data/sample.kicad_sch', import.meta.url), 'utf-8');

// parse() returns the root element (here, the top-level `kicad_sch` node) -
// every element under it, down to individual pins and text, is a KicadElement
// subclass with typed accessors where one exists, or a plain KicadElement
// otherwise.
const parser = new KicadParser();
const root = parser.parse(data);

console.log(`Root element: (${ root.name } ...)`);

// findChildrenByClass() only looks at direct children - that's what you want
// here, since placed symbol instances are direct children of the schematic
// root. (findAllChildrenByClass() would also walk into `lib_symbols`, which
// holds the *library* symbol definitions used for rendering, not placements.)
const symbols = root.findChildrenByClass(KicadElementSymbol);

console.log(`Found ${ symbols.length } symbol instances:\n`);

for (const symbol of symbols) {
	const properties = symbol.getAllProperties();
	console.log(`  ${ (properties['Reference'] ?? '?').padEnd(8) } ${ properties['Value'] ?? '' }`);
}
