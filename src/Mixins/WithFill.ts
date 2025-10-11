import { Ctor }                            from './Ctor';
import { KicadElementFill, KicadFillType } from '../KicadElementFill';
import { KicadElementLayer }               from '../KicadElementLayer';
import { KicadElement }                    from '../KicadElement';

export function WithFill<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setFill(type: KicadFillType) {
			let fill = this.findOrCreateChildByClass(KicadElementFill);
			fill.setType(type);
		}

		getFill(): KicadFillType {
			const fill = this.findFirstChildByClass(KicadElementFill);
			return fill?.getType() ?? 'none';
		}

		getFillColor(defaultColor = 'rgba(0,0,0,0)'): string {
			const fill = this.findFirstChildByClass(KicadElementFill);
			if (!fill) {
				return defaultColor;
			}
			switch (fill.getType()) {
				case 'none':
					return 'rgba(0,0,0,0)';
				case 'outline':
					return defaultColor;
				case 'background':
					return defaultColor;
				case 'color':
					return fill.getColor();
				default:
					return defaultColor;
			}
		}
	};
}

