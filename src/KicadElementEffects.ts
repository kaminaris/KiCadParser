import { KicadElementHide } from './KicadElementBoolean';
import { KicadElementFont } from './KicadElementFont';
import { KicadElement }     from './KicadElement';

/**
 * (effects
 * 	(font (size 1.27 1.27))
 * 	(hide yes)
 * 	(justify left)
 * )
 */
export class KicadElementEffects extends KicadElement {
	override name = 'effects';

	setHidden(value: boolean) {
		let found = this.findFirstChildByClass(KicadElementHide);
		if (!found) {
			found = new KicadElementHide();
			this.addChild(found);
		}
		found.value = value;
	}

	isHidden(): boolean {
		const found = this.findFirstChildByClass(KicadElementHide);
		return found ? found.value : false;
	}

	getOrCreateFont(): KicadElementFont {
		let found = this.findFirstChildByClass(KicadElementFont);
		if (!found) {
			found = new KicadElementFont();
			this.addChild(found);
		}
		return found;
	}

	setFont(width: number, height: number, italic?: boolean, bold?: boolean) {
		const font = this.getOrCreateFont();
		font.setSize(width, height);
		if (bold !== undefined) {
			font.setBold(bold);
		}
		if (italic !== undefined) {
			font.setItalic(italic);
		}
	}

	getFont(): { width: number, height: number, italic: boolean, bold: boolean } {
		const font = this.findFirstChildByClass(KicadElementFont);
		if (!font) {
			return { width: 0, height: 0, italic: false, bold: false };
		}
		const s = font.getSize();
		return {
			width: s.width ?? 0,
			height: s.height ?? 0,
			italic: font.getItalic() ?? false,
			bold: font.getBold() ?? false
		};
	}
}