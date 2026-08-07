import { Ctor }                                from './Ctor';
import { KicadElementStroke, KicadStrokeType } from '../KicadElementStroke';
import { KicadElementColor }                   from '../KicadElementColor';
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

		getStrokeColor(defaultColor = 'rgba(0,0,0,0)'): string {
			const stroke = this.findFirstChildByClass(KicadElementStroke);
			if (!stroke) {
				return defaultColor;
			}
			return stroke.getColor(defaultColor)
		}

		setStrokeColor(r: number, g: number, b: number, a: number) {
			this.findOrCreateChildByClass(KicadElementStroke).setColor(r, g, b, a);
		}

		/** null distinguishes "no (color …) child at all" from "explicitly
		 *  set" — same reasoning as WithEffects.getFontColorOverride(); unlike
		 *  that one, getStrokeColor() already returns a plain string rather
		 *  than a {r,g,b,a} object, so this can reuse it directly once
		 *  presence is confirmed. A present-but-all-zero color ALSO counts as
		 *  unset — real KiCad's own COLOR4D::UNSPECIFIED sentinel is exactly
		 *  (0,0,0,0) (common/gal/color4d.cpp, confirmed in the user's local
		 *  checkout), the value real KiCad itself writes for "not
		 *  customized," not a genuine "render fully transparent" instruction
		 *  — see KicadElementJunction.getColorOverride()'s matching check. */
		getStrokeColorOverride(): string | null {
			const stroke = this.findFirstChildByClass(KicadElementStroke);
			const color = stroke?.findFirstChildByClass(KicadElementColor);
			if (!color || (color.red === 0 && color.green === 0 && color.blue === 0 && color.alpha === 0)) {
				return null;
			}
			return stroke!.getColor();
		}
	};
}