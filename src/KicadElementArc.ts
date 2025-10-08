import { KicadElementShapeBase }                               from './KicadElementShapeBase';
import { KicadElementEnd, KicadElementMid, KicadElementStart } from './KicadElementXY';

/**
 * (arc
 * 	(start -2.032 -1.27)
 * 	(mid 0 -0.5572)
 * 	(end 2.032 -1.27)
 * 	(stroke (width 0.508) (type default))
 * 	(fill (type none))
 * )
 */
export class KicadElementArc extends KicadElementShapeBase {
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
}