/**
 * Example 3: load a schematic, change a symbol's Value, and write the result
 * back out. This is the core read-modify-write loop for scripting KiCad files.
 *
 * Run: yarn install && yarn 03
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { KicadParser } from '../src/KicadParser';
import { KicadElementSymbol } from '../src/KicadElementSymbol';

const inputPath = fileURLToPath(new URL('./sample-data/sample.kicad_sch', import.meta.url));
const outputDir = fileURLToPath(new URL('./output/', import.meta.url));
const outputPath = outputDir + 'sample-modified.kicad_sch';

const data = readFileSync(inputPath, 'utf-8');
const root = new KicadParser().parse(data);

// Direct children only - see 01-parse-schematic.ts for why findAllChildrenByClass
// would be wrong here (it'd also match the lib_symbols library definitions).
const symbols = root.findChildrenByClass(KicadElementSymbol);
const target = symbols.find(s => s.getAllProperties()['Reference'] === 'C3');

if (!target) {
	throw new Error('Could not find symbol C3 in the sample schematic');
}

console.log('Before:', target.getAllProperties());

// setProperty() (from the WithProperties mixin) updates an existing
// (property "Name" "Value" ...) child in place, preserving its position,
// font, placement, etc. - only the value text changes.
target.setProperty('Value', '100nF');

console.log('After: ', target.getAllProperties());

// write() regenerates the full s-expression tree, including every element
// that came along for the ride unmodified - the rest of the file round-trips
// exactly as it was parsed.
mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, root.write() + '\n');

console.log(`\nWrote modified schematic to ${ outputPath }`);
