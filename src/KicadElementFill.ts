import { KicadElementType } from './KicadElementType';
import { KicadElement }     from './KicadElement';

export type KicadFillType = 'none' | 'outline' | 'background';

export class KicadElementFill extends KicadElement {
	override name = 'fill';

	setType(value: KicadFillType) {
		const t = this.findOrCreateChildByClass(KicadElementType);
		t.setAttribute({ value, format: 'literal' }, 0);
	}
}