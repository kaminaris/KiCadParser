import { KicadElement } from './KicadElement';

export class KicadElementColor extends KicadElement {
	color?: string;
	red?: number;
	green?: number;
	blue?: number;
	alpha?: number;

	override afterParse() {
		if (this.attributes.length === 1) {
			// Handle case where color is given as a single hex string or name, e.g. #RRGGBBAA
			this.color = (this.attributes[0].value as string).trim();
			this.attributes.length = 0;
			return;
		}

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

	setColorName(color: string) {
		this.color = color;
	}

	getColor(): string {
		if (this.color) {
			return this.color;
		}

		// Transparent if color not set
		if (this.red === undefined || this.green === undefined || this.blue === undefined) {
			return 'rgba(0,0,0,0)';
		}

		// If alpha is not defined, return rgb()
		if (this.alpha === undefined) {
			return `rgb(${ this.red },${ this.green },${ this.blue })`;
		}

		return `rgba(${ this.red },${ this.green },${ this.blue },${ this.alpha })`;
	}

	override write(): string {
		if (this.color) {
			return this.pad() + `(color "${ this.color }")`;
		}

		return this.pad() + `(color ${ this.red } ${ this.green } ${ this.blue } ${ this.alpha })`;
	}
}
