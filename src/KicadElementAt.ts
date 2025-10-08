import { KicadElement } from './KicadElement';

/**
 * (at 0 3.81 270)
 */
export class KicadElementAt extends KicadElement {
	x = 0;
	y = 0;
	rotation?: number;

	constructor(x?: number, y?: number, rotation?: number) {
		super();
		if (x) {
			this.x = x;
		}
		if (y) {
			this.y = y;
		}
		if (rotation) {
			this.rotation = rotation;
		}
	}

	override afterParse() {
		if (this.attributes.length > 4) {
			throw new Error(`KicadElementAt expects 2 or 3 attributes, got ${ this.attributes.length }`);
		}

		this.x = this.attributes[0]?.value as number;
		this.y = this.attributes[1]?.value as number;
		if (this.attributes.length > 2) {
			this.rotation = this.attributes[2]?.value as number;
		}
		this.attributes.length = 0;

		if (isNaN(this.x) || isNaN(this.y)) {
			throw new Error('Width and height must be valid numbers.');
		}
	}

	override write(): string {
		const h = typeof this.rotation === 'undefined' ? '' : (' ' + this.rotation);
		return this.pad() + `(at ${ this.x } ${ this.y }${ h })`;
	}
}