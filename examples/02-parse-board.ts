/**
 * Example 2: parse a .kicad_pcb file and list its layers and footprints.
 *
 * Run: yarn install && yarn 02
 */
import { readFileSync } from 'fs';
import { KicadParser } from '../src/KicadParser';
import { KicadElementFootprint } from '../src/KicadElementFootprint';
import { KicadElementLayers } from '../src/KicadElementLayers';

const data = readFileSync(new URL('./sample-data/sample.kicad_pcb', import.meta.url), 'utf-8');

const root = new KicadParser().parse(data);
console.log(`Root element: (${ root.name } ...)`);

const layers = root.findFirstChildByClass(KicadElementLayers);
console.log(`\nBoard layers (${ layers?.layers.length ?? 0 }):`);
for (const layer of layers?.layers ?? []) {
	console.log(`  ${ layer.name }`);
}

const footprints = root.findChildrenByClass(KicadElementFootprint);
console.log(`\nFootprints (${ footprints.length }):`);
for (const fp of footprints) {
	const properties = fp.getAllProperties();
	const origin = fp.getOrigin();
	console.log(
		`  ${ (properties['Reference'] ?? '?').padEnd(6) } ${ (fp.getFootprintName() ?? '').padEnd(24) } ` +
		`at (${ origin.x }, ${ origin.y }) on ${ fp.getLayer() }`
	);
}
