import { WithOrigin }        from './Mixins/WithOrigin';
import { WithUUID }          from './Mixins/WithUUID';
import { KicadElementData }  from './KicadElementData';
import { KicadElementScale } from './KicadElementOffset';
import { KicadElement }      from './KicadElement';

/**
 * (image
 * 		(at 207.01 53.34)
 * 		(scale 0.75)
 * 		(uuid "7293b9a1-a9d1-4328-9730-b1a6763ff52d")
 * 		(data "...")
 * )
 */
export class KicadElementImage extends WithUUID(WithOrigin(KicadElement)) {
	override name = 'image';

	getData(): string | undefined {
		return this.findFirstChildByClass(KicadElementData)?.data;
	}

	/**
	 * A bare uniform scale factor (e.g. `(scale 0.75)`) - unrelated to the 3D
	 * model offset/scale/rotate triples in KicadElementModel, which are always
	 * nested `(xyz x y z)` values instead. See KicadElementModel for that case.
	 */
	getScale(): number | undefined {
		return this.findFirstChildByClass(KicadElementScale)?.offset;
	}

	setScale(scale: number): this {
		this.findOrCreateChildByClass(KicadElementScale).setSimpleValue(scale);
		return this;
	}
}
