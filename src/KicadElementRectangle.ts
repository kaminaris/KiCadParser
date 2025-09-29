import { KicadElementFill, KicadFillType } from './KicadElementFill';
import { KicadElementStroke, KicadStrokeType } from './KicadElementStroke';
import { KicadElementEnd }                     from './KicadElementEnd';
import { KicadElementStart }                   from './KicadElementStart';
import { KicadElement }                        from './KicadElement';

export class KicadElementRectangle extends KicadElement {
	override name = 'rectangle';
	// strokeWidth = 0.254;

	constructor(
		startX?: number,
		startY?: number,
		endX?: number,
		endY?: number
	) {
		super();

		if (startX !== undefined && startY !== undefined) {
			const s = new KicadElementStart(startX, startY);
			this.addChild(s);
		}

		if (endX !== undefined && endY !== undefined) {
			const e = new KicadElementEnd(endX, endY);
			this.addChild(e);
		}
	}

	setStroke(width: number, type: KicadStrokeType = 'default') {
		const str = this.findOrCreateChildByClass(KicadElementStroke);
		str.setWidth(width);
		str.setType(type);
	}

	setFill(type: KicadFillType) {
		let fill = this.findOrCreateChildByClass(KicadElementFill);
		fill.setType(type)
	}

// 	override write(): string {
// 		return `
// (rectangle
//     (start ${ this.round(this.startX) } ${ this.round(this.startY) })
//     (end ${ this.round(this.endX) } ${ this.round(this.endY) })
//     (stroke
//         (width ${ this.strokeWidth })
//         (type default)
//     )
//     (fill
//         (type background)
//     )
// )
// 		`;
// 	}
}