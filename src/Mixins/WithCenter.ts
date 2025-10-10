import { Ctor }                                                   from './Ctor';
import { KicadElementCenter, KicadElementEnd, KicadElementStart } from '../KicadElementXY';
import { KicadElement }                                           from '../KicadElement';

export function WithCenter<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setCenter(
			x?: number,
			y?: number,
		) {
			if (x !== undefined && y !== undefined) {
				const existing = this.findOrCreateChildByClass(KicadElementCenter);
				existing.x = x;
				existing.y = y;
			}
		}

		getCenter(): { x: number, y: number } {
			const start = this.findFirstChildByClass(KicadElementCenter);
			return { x: start?.x ?? 0, y: start?.y ?? 0 };
		}
	};
}