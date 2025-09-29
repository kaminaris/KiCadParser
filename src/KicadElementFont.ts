import { KicadElementColor } from './KicadElementColor';
import { KicadElement }      from './KicadElement';

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

	setSize(width: number, height: number) {
		const foundAttr = this.findFirstChildByName('size');
		if (foundAttr) {
			foundAttr.attributes[0].value = width;
			foundAttr.attributes[1].value = height;
		}
		else {
			const attr = new KicadElement();
			attr.name = 'size';
			attr.attributes.push({ format: 'numeric', value: width });
			attr.attributes.push({ format: 'numeric', value: height });
			this.addChild(attr);
		}
	}

	setFace(face: string) {
		const foundAttr = this.findFirstChildByName('face');
		if (foundAttr) {
			foundAttr.attributes[0].value = face;
		}
		else {
			const attr = new KicadElement();
			attr.name = 'face';
			attr.attributes.push({ format: 'quoted', value: face });
			this.addChild(attr);
		}
	}

	setBold(bold: boolean) {
		const foundAttr = this.findFirstChildByName('bold');
		if (foundAttr) {
			foundAttr.attributes[0].value = bold;
		}
		else {
			const attr = new KicadElement();
			attr.name = 'bold';
			attr.attributes.push({ format: 'boolean', value: bold });
			this.addChild(attr);
		}
	}

	setItalic(italic: boolean) {
		let foundAttr = this.findFirstChildByName('italic');
		if (foundAttr) {
			foundAttr.attributes[0].value = italic;
		}
		else {
			const attr = new KicadElement();
			attr.name = 'italic';
			attr.attributes.push({ format: 'boolean', value: italic });
			this.addChild(attr);
		}
	}

	setColor(r: number, g: number, b: number, a: number) {
		let foundAttr = this.findFirstChildByClass(KicadElementColor);
		if (!foundAttr) {
			foundAttr = new KicadElementColor();
			this.addChild(foundAttr);
		}

		foundAttr.setColor(r, g, b, a);
	}
}