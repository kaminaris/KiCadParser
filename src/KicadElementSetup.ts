import { KicadElementLayer } from './KicadElementLayer';
import { KicadElement }      from './KicadElement';

/**
 * (setup
 * 		(stackup ...)
 * 		(pad_to_mask_clearance 0)
 * 		...
 * 		(pcbplotparams ...)
 * )
 */
export class KicadElementSetup extends KicadElement {
	override name = 'setup';

	getStackup(): KicadElementStackup | undefined {
		return this.findFirstChildByClass(KicadElementStackup);
	}

	getOrCreateStackup(): KicadElementStackup {
		return this.findOrCreateChildByClass(KicadElementStackup);
	}
}

/**
 * (stackup
 * 		(layer "F.SilkS" (type "Top Silk Screen"))
 * 		(layer "F.Cu" (type "copper") (thickness 0.035))
 * 		...
 * )
 *
 * Example - defining a simple 2-layer stackup from scratch:
 *
 * const stackup = setup.getOrCreateStackup();
 * stackup.addLayer('F.SilkS').setStackupType('Top Silk Screen');
 * stackup.addLayer('F.Mask').setStackupType('Top Solder Mask').setThickness(0.01);
 * stackup.addLayer('F.Cu').setStackupType('copper').setThickness(0.035);
 * stackup.addLayer('dielectric 1').setStackupType('core')
 * 	.setThickness(1.51).setMaterial('FR4').setEpsilonR(4.5).setLossTangent(0.02);
 * stackup.addLayer('B.Cu').setStackupType('copper').setThickness(0.035);
 * stackup.addLayer('B.Mask').setStackupType('Bottom Solder Mask').setThickness(0.01);
 * stackup.addLayer('B.SilkS').setStackupType('Bottom Silk Screen');
 */
export class KicadElementStackup extends KicadElement {
	override name = 'stackup';

	addLayer(layerName: string): KicadElementLayer {
		const layer = new KicadElementLayer(layerName);
		this.addChild(layer);
		return layer;
	}

	getLayers(): KicadElementLayer[] {
		return this.findChildrenByClass(KicadElementLayer);
	}
}
