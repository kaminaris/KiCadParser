import { Ctor }             from './Ctor';
import { KicadElementSize } from '../KicadElementSize';
import { KicadElement }     from '../KicadElement';

export function WithSize<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setSize(width?: number, height?: number) {
			if (width === undefined || height === undefined) {
				return;
			}

			const existing = this.findOrCreateChildByClass(KicadElementSize);
			existing.width = width;
			existing.height = height;
		}

		getSize(): { width: number, height: number } {
			const size = this.findFirstChildByClass(KicadElementSize);
			return { width: size?.width ?? 0, height: size?.height ?? 0 };
		}
	};
}