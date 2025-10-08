import {
	KicadElementJustify, KicadJustifyHorizontal, KicadJustifyVertical
} from './KicadElementJustify';

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

	setJustify(
		horizontal?: KicadJustifyHorizontal,
		vertical?: KicadJustifyVertical,
		mirrored?: boolean
	) {
		const justifyEl = this.findOrCreateChildByClass(KicadElementJustify);
		justifyEl.setJustify(horizontal, vertical, mirrored);
	}

	getJustify(): {
		horizontal: KicadJustifyHorizontal,
		vertical: KicadJustifyVertical,
		mirrored: boolean
	} {
		const justifyEl = this.findFirstChildByClass(KicadElementJustify);
		if (!justifyEl) {
			return { horizontal: 'middle', vertical: 'middle', mirrored: false };
		}
		return justifyEl.getJustify();
	}

	getAnchorPoint(): { x: number, y: number } {
		const justify = this.getJustify();
		let x = 0;
		let y = 0;

		switch (justify.horizontal) {
			case 'left':
				x = 0;
				break;
			case 'middle':
				x = 0.5;
				break;
			case 'right':
				x = 1;
				break;
		}

		switch (justify.vertical) {
			case 'top':
				y = 0;
				break;
			case 'middle':
				y = 0.5;
				break;
			case 'bottom':
				y = 1;
				break;
		}

		if (justify.mirrored) {
			x = 1 - x;
		}

		return { x, y };
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