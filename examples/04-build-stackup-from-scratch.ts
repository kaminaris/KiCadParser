/**
 * Example 4: build a board layer stackup entirely from scratch, with no
 * input file at all - useful when generating a new .kicad_pcb programmatically.
 *
 * Run: yarn install && yarn 04
 */
import { KicadElementSetup } from '../src/KicadElementSetup';

const setup = new KicadElementSetup();
const stackup = setup.getOrCreateStackup();

stackup.addLayer('F.SilkS').setStackupType('Top Silk Screen');
stackup.addLayer('F.Mask').setStackupType('Top Solder Mask').setThickness(0.01);
stackup.addLayer('F.Cu').setStackupType('copper').setThickness(0.035);
stackup.addLayer('dielectric 1').setStackupType('core')
	.setThickness(1.51).setMaterial('FR4').setEpsilonR(4.5).setLossTangent(0.02);
stackup.addLayer('B.Cu').setStackupType('copper').setThickness(0.035);
stackup.addLayer('B.Mask').setStackupType('Bottom Solder Mask').setThickness(0.01);
stackup.addLayer('B.SilkS').setStackupType('Bottom Silk Screen');

console.log(setup.write());

// This `setup` element can be dropped straight into a new or existing board:
//   boardRoot.addChild(setup);
// or, if the board already has one, replace its stackup in place:
//   const existingSetup = boardRoot.findOrCreateChildByClass(KicadElementSetup);
//   existingSetup.getOrCreateStackup() ... (same builder calls as above)
