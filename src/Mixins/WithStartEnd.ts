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
			// find-or-create, not addChild: callers (e.g. a live drag) may call
			// this repeatedly on the same instance — addChild unconditionally
			// would accumulate duplicate Start/End children on every call.
			if (startX !== undefined && startY !== undefined) {
				const s = this.findOrCreateChildByClass(KicadElementStart);
				s.x = startX;
				s.y = startY;
			}

			if (endX !== undefined && endY !== undefined) {
				const e = this.findOrCreateChildByClass(KicadElementEnd);
				e.x = endX;
				e.y = endY;
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