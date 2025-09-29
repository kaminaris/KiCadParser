import { KicadElement } from './KicadElement';

export class KicadElementColor extends KicadElement {
	red: number = 0;
	green: number = 0;
	blue: number = 0;
	alpha: number = 0;

	override afterParse() {
		if (this.attributes.length !== 4) {
			throw new Error(`KicadElementColor expects exactly four attributes, got ${ this.attributes.length }`);
		}

		this.red = parseInt(this.attributes[0].value as string);
		this.green = parseInt(this.attributes[1].value as string);
		this.blue = parseInt(this.attributes[2].value as string);
		this.alpha = parseFloat(this.attributes[3].value as string);
		this.attributes.length = 0;
	}

	setColor(r: number, g: number, b: number, a: number) {
		this.red = r;
		this.green = g;
		this.blue = b;
		this.alpha = a;
	}

	override write(): string {
		return this.pad() + `(color ${ this.red } ${ this.green } ${ this.blue } ${ this.alpha })`;
	}
}
