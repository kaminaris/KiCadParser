import { KicadElementEffects } from '../KicadElementEffects';
import { KicadElementFont }    from '../KicadElementFont';
import { KicadElementColor }   from '../KicadElementColor';
import { KicadElement }        from '../KicadElement';
import { Ctor }                from './Ctor';

export function WithEffects<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setHidden(value: boolean) {
			const effects = this.findOrCreateChildByClass(KicadElementEffects);
			effects.setHidden(value);
		}

		isHidden(): boolean {
			const found = this.findFirstChildByClass(KicadElementEffects);
			return found ? found.isHidden() : false;
		}

		getOrCreateFont(): KicadElementFont {
			const effects = this.findOrCreateChildByClass(KicadElementEffects);
			return effects.findOrCreateChildByClass(KicadElementFont);
		}

		setFont(width: number, height: number, italic?: boolean, bold?: boolean, thickness?: number) {
			const font = this.getOrCreateFont();
			font.setSize(width, height);

			if (bold !== undefined) {
				font.setBold(bold);
			}

			if (italic !== undefined) {
				font.setItalic(italic);
			}

			if (thickness !== undefined) {
				font.setThickness(thickness);
			}
		}

		getFont(): { width: number, height: number, italic: boolean, bold: boolean, thickness?: number } {
			const effects = this.findFirstChildByClass(KicadElementEffects);
			const font = effects?.findFirstChildByClass(KicadElementFont);
			if (!font) {
				return { width: 0, height: 0, italic: false, bold: false };
			}
			const s = font.getSize();
			return {
				width: s.width ?? 0,
				height: s.height ?? 0,
				italic: font.getItalic() ?? false,
				bold: font.getBold() ?? false,
				thickness: font.getThickness()
			};
		}

		setFontColor(r: number, g: number, b: number, a: number) {
			this.getOrCreateFont().setColor(r, g, b, a);
		}

		/** null (not undefined) specifically distinguishes "no (color …) child
		 *  at all" from "explicitly set", INCLUDING a present-but-all-zero
		 *  color (real KiCad's own COLOR4D::UNSPECIFIED sentinel — see
		 *  WithStroke.getStrokeColorOverride()'s matching check) —
		 *  KicadElementFont.getColor() always returns a concrete {r,g,b,a}
		 *  (defaulting to opaque black) even when no color child exists,
		 *  which can't tell those cases apart on its own. Returns a CSS
		 *  rgba() string, matching WithStroke/WithFill's override-getter
		 *  convention — every caller (renderer color resolution, the
		 *  property panel's color swatch) wants a ready-to-use CSS string,
		 *  not a raw component object. */
		getFontColorOverride(): string | null {
			const font = this.findFirstChildByClass(KicadElementEffects)?.findFirstChildByClass(KicadElementFont);
			const color = font?.findFirstChildByClass(KicadElementColor);
			if (!color || (color.red === 0 && color.green === 0 && color.blue === 0 && color.alpha === 0)) {
				return null;
			}
			const c = font!.getColor();
			return `rgba(${ c.r ?? 0 }, ${ c.g ?? 0 }, ${ c.b ?? 0 }, ${ c.a ?? 1 })`;
		}
	};
}