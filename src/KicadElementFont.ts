import { KicadElementBold }      from 'src/app/Lib/Kicad/src/KicadElementBold';
import { KicadElementFace }      from 'src/app/Lib/Kicad/src/KicadElementFace';
import { KicadElementItalic }    from 'src/app/Lib/Kicad/src/KicadElementItalic';
import { KicadElementSize }      from 'src/app/Lib/Kicad/src/KicadElementSize';
import { KicadElementThickness } from 'src/app/Lib/Kicad/src/KicadElementThickness';
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

	setSize(width: number, height: number) {
		const foundAttr = this.findOrCreateChildByClass(KicadElementSize);

		foundAttr.width = width;
		foundAttr.height = height;
	}

	setThickness(thickness: number) {
		let foundAttr = this.findOrCreateChildByClass(KicadElementThickness);

		foundAttr.value = thickness;
	}

	setBold(bold: boolean) {
		const foundAttr = this.findOrCreateChildByClass(KicadElementBold);
		foundAttr.value = bold;
	}

	setItalic(italic: boolean) {
		const foundAttr = this.findOrCreateChildByClass(KicadElementItalic);
		foundAttr.value = italic;
	}

	setColor(r: number, g: number, b: number, a: number) {
		const foundAttr = this.findOrCreateChildByClass(KicadElementColor);

		foundAttr.setColor(r, g, b, a);
	}
}