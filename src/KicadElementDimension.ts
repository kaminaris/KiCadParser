import { WithLayer }        from './Mixins/WithLayer';
import { WithPts }          from './Mixins/WithPts';
import { WithUUID }         from './Mixins/WithUUID';
import { KicadElementType } from './KicadElementType';
import { KicadElement }     from './KicadElement';

/**
 * (dimension
 * 		(type orthogonal)
 * 		(layer "Dwgs.User")
 * 		(uuid "85685603-e5af-44b2-ae27-2ea84a2cbf3a")
 * 		(pts (xy 170 90) (xy 170 110))
 * 		(height 2.75)
 * 		(orientation 1)
 * 		(format ...)
 * 		(style ...)
 * 		(gr_text "20" ...)
 * )
 */
export class KicadElementDimension extends WithUUID(WithPts(WithLayer(KicadElement))) {
	override name = 'dimension';

	getDimensionType(): string {
		return this.findFirstChildByClass(KicadElementType)?.attributes[0]?.value as string ?? '';
	}

	setDimensionType(type: string): this {
		this.findOrCreateChildByClass(KicadElementType).setAttribute({ value: type, format: 'literal' }, 0);
		return this;
	}

	getHeight(): number | undefined {
		return this.getSimpleChildValue('height') as number | undefined;
	}

	setHeight(height: number): this {
		this.setSimpleChild('height', height, 'numeric');
		return this;
	}

	getOrientation(): number | undefined {
		return this.getSimpleChildValue('orientation') as number | undefined;
	}

	setOrientation(orientation: number): this {
		this.setSimpleChild('orientation', orientation, 'numeric');
		return this;
	}
}
