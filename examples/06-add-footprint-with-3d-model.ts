/**
 * Example 6: build a new footprint's 3D model reference and symbol instance
 * data from scratch - the pieces you need when programmatically placing a
 * new component rather than just editing an existing one.
 *
 * Run: yarn install && yarn 06
 */
import { KicadElementModel } from '../src/KicadElementModel';
import { KicadElementInstances } from '../src/KicadElementInstances';

// A 3D model reference with KiCad's usual identity offset/scale/rotate:
const model = KicadElementModel.create('${KICAD10_3DMODEL_DIR}/Capacitor_SMD.3dshapes/C_0402_1005Metric.step');
console.log('New model block:\n');
console.log(model.write());

// Or fully custom, e.g. a part that needs rotating to match its footprint:
const rotatedModel = new KicadElementModel('${KICAD10_3DMODEL_DIR}/Diode_SMD.3dshapes/D_SOD-123.step')
	.setOffset(0, 0, 0)
	.setScale(1, 1, 1)
	.setRotate(0, 0, 90);
console.log('\nRotated model block:\n');
console.log(rotatedModel.write());

// Symbol/footprint instance data - the per-project reference & unit
// assignment KiCad stores so the same symbol can appear in multiple sheets
// or projects with different designators:
const instances = new KicadElementInstances();
instances.addProject('MyProject').addPath('/sheet-uuid/symbol-uuid', 'C7', 1);
console.log('\nNew instances block:\n');
console.log(instances.write());

// Both blocks can be appended to a footprint/symbol element you're building:
//   footprint.addChild(model);
//   symbol.addChild(instances);
