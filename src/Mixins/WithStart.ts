import { Ctor }                               from './Ctor';
import { KicadElementEnd, KicadElementStart } from '../KicadElementXY';
import { KicadElement }                       from '../KicadElement';

export function WithStart<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setStart(
			x?: number,
			y?: number,
		) {
			if (x !== undefined && y !== undefined) {
				const existing = this.findOrCreateChildByClass(KicadElementStart);
				existing.x = x;
				existing.y = y;
			}
		}

		getStart(): { x: number, y: number } {
			const start = this.findFirstChildByClass(KicadElementStart);
			return { x: start?.x ?? 0, y: start?.y ?? 0 };
		}
	};
}