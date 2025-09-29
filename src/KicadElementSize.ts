import { KicadElement } from './KicadElement';

export class KicadElementSize extends KicadElement {
	width?: number;
	height?: number;

	constructor(width?: number, height?: number) {
		super();
		if (width) {
			this.width = width;
		}
		if (height) {
			this.height = height;
		}
	}

	override afterParse() {
		if (this.attributes.length > 2) {
			console.log(this);
			throw new Error('Size element must have at least one attribute: width and height.');
		}

		this.width = this.attributes[0]?.value as number;
		if (this.attributes.length > 1) {
			this.height = this.attributes[1]?.value as number;
		}

		if (isNaN(this.width)) {
			console.log(this);
			throw new Error('Width must be valid numbers.');
		}
	}

	override write(): string {
		const h = this.height ? ' ' + this.height : '';
		return this.pad() + `(size ${ this.width }${ h })`;
	}
}