import { KicadElement } from './KicadElement';

export class KicadElementXY extends KicadElement {
	override name = 'xy';
	x: number = 0;
	y: number = 0;

	constructor(x?: number, y?: number) {
		super();
		if (x !== undefined) {
			this.x = x;
		}
		if (y !== undefined) {
			this.y = y;
		}
	}

	override afterParse() {
		if (this.attributes.length !== 2) {
			throw new Error(`${ this.name } expects 2 attributes, got ${ this.attributes.length }`);
		}

		this.x = parseFloat(this.attributes[0].value as string);
		this.y = parseFloat(this.attributes[1].value as string);
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${ this.name } ${ this.x } ${ this.y })`;
	}
}

export class KicadElementMid extends KicadElementXY {
	override name = 'mid';
}