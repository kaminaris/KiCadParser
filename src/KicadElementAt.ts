import { KicadElement } from './KicadElement';

export class KicadElementAt extends KicadElement {
	x = 0;
	y = 0;
	size?: number;

	constructor(x?: number, y?: number, rotation?: number) {
		super();
		if (x) {
			this.x = x;
		}
		if (y) {
			this.y = y;
		}
		if (rotation) {
			this.size = rotation;
		}
	}

	override afterParse() {
		if (this.attributes.length > 4) {
			throw new Error(`KicadElementAt expects 2 or 3 attributes, got ${ this.attributes.length }`);
		}

		this.x = this.attributes[0]?.value as number;
		this.y = this.attributes[1]?.value as number;
		if (this.attributes.length > 2) {
			this.size = this.attributes[2]?.value as number;
		}
		this.attributes.length = 0;

		if (isNaN(this.x) || isNaN(this.y)) {
			throw new Error('Width and height must be valid numbers.');
		}
	}

	override write(): string {
		const h = typeof this.size === 'undefined' ? '' : (' ' + this.size);
		return this.pad() + `(at ${ this.x } ${ this.y }${ h })`;
	}
}