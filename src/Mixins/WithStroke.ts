import { Ctor }                                from './Ctor';
import { KicadElementStroke, KicadStrokeType } from '../KicadElementStroke';
import { KicadElement }                        from '../KicadElement';

export function WithStroke<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setStroke(width: number, type: KicadStrokeType = 'default') {
			const str = this.findOrCreateChildByClass(KicadElementStroke);
			str.setWidth(width);
			str.setType(type);
		}

		getStroke(): { width: number, type: KicadStrokeType } {
			const str = this.findFirstChildByClass(KicadElementStroke);
			if (!str) {
				return { width: 0.2, type: 'default' }; // Default stroke
			}
			return { width: str.getWidth(), type: str.getType() };
		}
	};
}