import { Ctor }           from './Ctor';
import { KicadElementAt } from '../KicadElementAt';
import { KicadElement }   from '../KicadElement';

export function WithOrigin<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setOrigin(x: number, y: number, rotation?: number) {
			const existing = this.findOrCreateChildByClass(KicadElementAt);
			existing.x = x;
			existing.y = y;
			existing.rotation = rotation ?? 0;
		}

		getOrigin(): { x: number, y: number, rotation: number } {
			const xy = this.findFirstChildByClass(KicadElementAt);
			if (!xy) {
				return { x: 0, y: 0, rotation: 0 };
			}
			return { x: xy.x, y: xy.y, rotation: xy.rotation ?? 0 };
		}
	};
}