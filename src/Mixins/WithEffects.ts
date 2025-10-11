import { KicadElementEffects } from '../KicadElementEffects';
import { KicadElementFont }    from '../KicadElementFont';
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
	};
}