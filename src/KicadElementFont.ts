import { KicadElementBold }      from './KicadElementBold';
import { KicadElementFace }      from './KicadElementFace';
import { KicadElementItalic }    from './KicadElementItalic';
import { KicadElementSize }      from './KicadElementSize';
import { KicadElementThickness } from './KicadElementThickness';
import { KicadElementColor }     from './KicadElementColor';
import { KicadElement }          from './KicadElement';

/**
 * 			(font
 * 				(face "Caladea")
 * 				(size 2 2)
 * 				(bold yes)
 * 				(italic yes)
 * 				(color 225 255 160 1)
 * 			)
 * 	)
 */
export class KicadElementFont extends KicadElement {
	override name = 'font';

	setFace(face: string) {
		const foundAttr = this.findOrCreateChildByClass(KicadElementFace);
		foundAttr.value = face;
	}

	getFace() {
		const foundAttr = this.findFirstChildByClass(KicadElementFace);
		return foundAttr?.value ?? '';
	}

	setSize(width: number, height: number) {
		const foundAttr = this.findOrCreateChildByClass(KicadElementSize);

		foundAttr.width = width;
		foundAttr.height = height;
	}

	getSize() {
		const foundAttr = this.findFirstChildByClass(KicadElementSize);
		return { width: foundAttr?.width ?? 0, height: foundAttr?.height ?? 0 };
	}

	setThickness(thickness: number) {
		let foundAttr = this.findOrCreateChildByClass(KicadElementThickness);

		foundAttr.value = thickness;
	}

	getThickness() {
		const foundAttr = this.findFirstChildByClass(KicadElementThickness);
		return foundAttr?.value ?? 0;
	}

	setBold(bold: boolean) {
		const foundAttr = this.findOrCreateChildByClass(KicadElementBold);
		foundAttr.value = bold;
	}

	getBold() {
		const foundAttr = this.findFirstChildByClass(KicadElementBold);
		return foundAttr?.value ?? false;
	}

	setItalic(italic: boolean) {
		const foundAttr = this.findOrCreateChildByClass(KicadElementItalic);
		foundAttr.value = italic;
	}

	getItalic() {
		const foundAttr = this.findFirstChildByClass(KicadElementItalic);
		return foundAttr?.value ?? false;
	}

	setColor(r: number, g: number, b: number, a: number) {
		const foundAttr = this.findOrCreateChildByClass(KicadElementColor);

		foundAttr.setColor(r, g, b, a);
	}

	getColor() {
		const foundAttr = this.findFirstChildByClass(KicadElementColor);
		if (foundAttr) {
			return { r: foundAttr.red, g: foundAttr.green, b: foundAttr.blue, a: foundAttr.alpha };
		}
		return { r: 0, g: 0, b: 0, a: 1 };
	}
}