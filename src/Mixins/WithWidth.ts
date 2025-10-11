import { Ctor }              from './Ctor';
import { KicadElementWidth } from '../KicadElementNumeric';
import { KicadElement }      from '../KicadElement';

export function WithWidth<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setWidth(width: number) {
			const widthChild = this.findOrCreateChildByClass(KicadElementWidth);
			widthChild.value = width;
		}

		getWidth(): number {
			const widthChild = this.findFirstChildByClass(KicadElementWidth);
			return widthChild?.value ? widthChild?.value : 0.2;
		}
	};
}