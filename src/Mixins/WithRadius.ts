import { Ctor }               from './Ctor';
import { KicadElementRadius } from '../KicadElementNumeric';
import { KicadElement }       from '../KicadElement';

export function WithRadius<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setRadius(radius?: number) {
			if (radius === undefined) {
				return;
			}
			const existing = this.findOrCreateChildByClass(KicadElementRadius);
			existing.value = radius;
		}

		getRadius(): number {
			const radius = this.findFirstChildByClass(KicadElementRadius);
			return radius?.value ?? 0;
		}
	};
}