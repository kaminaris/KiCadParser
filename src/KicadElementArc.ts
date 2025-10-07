import { KicadElementMid }                     from './KicadElementXY';
import { KicadElementFill, KicadFillType }     from './KicadElementFill';
import { KicadElementStroke, KicadStrokeType } from './KicadElementStroke';
import { KicadElementEnd }                     from './KicadElementEnd';
import { KicadElementStart }                   from './KicadElementStart';
import { KicadElement }                        from './KicadElement';

export class KicadElementArc extends KicadElement {
	override name = 'arc';

	constructor(
		startX?: number,
		startY?: number,
		midX?: number,
		midY?: number,
		endX?: number,
		endY?: number
	) {
		super();

		if (startX !== undefined && startY !== undefined) {
			const s = new KicadElementStart(startX, startY);
			this.addChild(s);
		}

		if (midX !== undefined && midY !== undefined) {
			const m = new KicadElementMid(midX, midY);
			this.addChild(m);
		}

		if (endX !== undefined && endY !== undefined) {
			const e = new KicadElementEnd(endX, endY);
			this.addChild(e);
		}
	}

	getStartMidEnd(): {
		start: { x: number, y: number },
		mid: { x: number, y: number },
		end: { x: number, y: number }
	} {
		const start = this.findFirstChildByClass(KicadElementStart);
		const mid = this.findFirstChildByClass(KicadElementMid);
		const end = this.findFirstChildByClass(KicadElementEnd);
		return {
			start: { x: start?.x ?? 0, y: start?.y ?? 0 },
			mid: { x: mid?.x ?? 0, y: mid?.y ?? 0 },
			end: { x: end?.x ?? 0, y: end?.y ?? 0 }
		};
	}

	setStroke(width: number, type: KicadStrokeType = 'default') {
		const str = this.findOrCreateChildByClass(KicadElementStroke);
		str.setWidth(width);
		str.setType(type);
	}

	getStroke(): { width: number, type: KicadStrokeType } {
		const str = this.findFirstChildByClass(KicadElementStroke);
		if (!str) {
			return { width: 0.2, type: 'default' }; // Default stroke
		}
		return { width: str.getWidth(), type: str.getType() };
	}

	setFill(type: KicadFillType) {
		let fill = this.findOrCreateChildByClass(KicadElementFill);
		fill.setType(type);
	}

	getFill(): KicadFillType {
		const fill = this.findFirstChildByClass(KicadElementFill);
		return fill?.getType() ?? 'none';
	}
}