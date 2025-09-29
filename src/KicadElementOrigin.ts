import { KicadElement } from './KicadElement';

export class KicadElementOrigin extends KicadElement {
	x = 0;
	y = 0;
	z: number | null = null;

	constructor(x: number, y: number, z?: number) {
		super();

		this.x = x;
		this.y = y;
		if (z !== undefined) {
			this.z = z;
		}
	}

	override write(): string {
		return `(at ${ this.round(this.x) } ${ this.round(this.y) } ${ this.z !== null ? this.round(this.z) : '' })`;
	}
}