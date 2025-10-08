import { KicadElementColor } from 'src/app/Lib/Kicad/src/KicadElementColor';
import { KicadElementType }  from './KicadElementType';
import { KicadElement }      from './KicadElement';

export type KicadFillType = 'none' | 'outline' | 'background' | 'color';

/**
 * (fill (type none))
 */
export class KicadElementFill extends KicadElement {
	override name = 'fill';

	setType(value: KicadFillType) {
		const t = this.findOrCreateChildByClass(KicadElementType);
		t.setAttribute({ value, format: 'literal' }, 0);
	}

	getType(): KicadFillType {
		const t = this.findFirstChildByClass(KicadElementType);
		return (t?.attributes[0]?.value ?? 'none') as KicadFillType;
	}

	getColor(defaultColor = 'rgba(0,0,0,0)'): string {
		const t = this.findFirstChildByClass(KicadElementColor);
		if (!t) {
			return defaultColor;
		}

		return t.getColor();
	}
}