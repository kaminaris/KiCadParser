import { KicadElementFont } from './KicadElementFont';
import { KicadElementHide } from './KicadElementHide';
import { KicadElement }     from './KicadElement';

export class KicadElementEffects extends KicadElement {
	override name = 'effects';
	// hidden = false;
	// justify: 'left' | 'middle' | 'right' = 'middle';

	setHidden(value: boolean) {
		let found = this.findFirstChildByClass(KicadElementHide);
		if (!found) {
			found = new KicadElementHide();
			this.addChild(found);
		}
		found.value = value;
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
}