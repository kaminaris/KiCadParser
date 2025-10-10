import { Ctor }                               from './Ctor';
import { KicadElementEnd, KicadElementStart } from '../KicadElementXY';
import { KicadElement }                       from '../KicadElement';

export function WithStartEnd<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setStartEnd(
			startX?: number,
			startY?: number,
			endX?: number,
			endY?: number
		) {
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
	};
}