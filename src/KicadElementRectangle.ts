import { KicadElementShapeBase }               from './KicadElementShapeBase';
import { KicadElementEnd, KicadElementStart }  from './KicadElementXY';

export class KicadElementRectangle extends KicadElementShapeBase {
	override name = 'rectangle';

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

	getStartEnd(): { start: { x: number, y: number }, end: { x: number, y: number } } {
		const start = this.findFirstChildByClass(KicadElementStart);
		const end = this.findFirstChildByClass(KicadElementEnd);
		return {
			start: { x: start?.x ?? 0, y: start?.y ?? 0 },
			end: { x: end?.x ?? 0, y: end?.y ?? 0 }
		};
	}
}