import { Ctor }                                                   from './Ctor';
import { KicadElementCenter, KicadElementEnd, KicadElementStart } from '../KicadElementXY';
import { KicadElement }                                           from '../KicadElement';

export function WithEnd<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setEnd(
			x?: number,
			y?: number,
		) {
			if (x !== undefined && y !== undefined) {
				const existing = this.findOrCreateChildByClass(KicadElementEnd);
				existing.x = x;
				existing.y = y;
			}
		}

		getEnd(): { x: number, y: number } {
			const start = this.findFirstChildByClass(KicadElementEnd);
			return { x: start?.x ?? 0, y: start?.y ?? 0 };
		}
	};
}