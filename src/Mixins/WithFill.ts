import { Ctor }                            from './Ctor';
import { KicadElementFill, KicadFillType } from '../KicadElementFill';
import { KicadElementLayer }               from '../KicadElementLayer';
import { KicadElementColor }               from '../KicadElementColor';
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

		setFillColor(r: number, g: number, b: number, a: number) {
			this.findOrCreateChildByClass(KicadElementFill).setColor(r, g, b, a);
		}

		/** null distinguishes "no (color …) child at all" from "explicitly
		 *  set", INCLUDING a present-but-all-zero color (real KiCad's own
		 *  COLOR4D::UNSPECIFIED sentinel) — same reasoning as WithStroke.
		 *  getStrokeColorOverride(). Only meaningful when getFill() ===
		 *  'color'; harmless to call otherwise. */
		getFillColorOverride(): string | null {
			const fill = this.findFirstChildByClass(KicadElementFill);
			const color = fill?.findFirstChildByClass(KicadElementColor);
			if (!color || (color.red === 0 && color.green === 0 && color.blue === 0 && color.alpha === 0)) {
				return null;
			}
			return fill!.getColor();
		}
	};
}

