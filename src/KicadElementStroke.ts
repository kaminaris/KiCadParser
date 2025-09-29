import { KicadElementColor } from './KicadElementColor';
import { KicadElementType }  from './KicadElementType';
import { KicadElementWidth } from './KicadElementWidth';
import { KicadElement }      from './KicadElement';

export type KicadStrokeType = 'default' | 'solid' | 'dash' | 'dot' | 'dash_dot' | 'dash_dot_dot';

export class KicadElementStroke extends KicadElement {
	// strokeType: KicadStrokeType = 'solid';
	// width = 0.12;
	override name = 'stroke';

	setWidth(width: number) {
		const widthChild = this.findOrCreateChildByClass(KicadElementWidth);
		widthChild.value = width;
	}

	setType(type: KicadStrokeType) {
		let typeAttr = this.findOrCreateChildByClass(KicadElementType);
		typeAttr.setAttribute({ value: type, format: 'literal' }, 0);
	}

	setColor(r: number, g: number, b: number, a: number) {
		const colorAttr = this.findOrCreateChildByClass(KicadElementColor);
		colorAttr.setColor(r, g, b, a);
	}

	override afterParse() {

	}

	// override write(): string {
	// 	return `(stroke (width ${ this.width }) (type ${ this.strokeType }))`;
	// }
}