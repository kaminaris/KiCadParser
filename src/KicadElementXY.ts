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

export class KicadElementStart extends KicadElementXY {
	override name = 'start';
}

export class KicadElementEnd extends KicadElementXY {
	override name = 'end';
}

export class KicadElementMid extends KicadElementXY {
	override name = 'mid';
}

export class KicadElementCenter extends KicadElementXY {
	override name = 'center';
}

/**
 * (xyz 0 0 0) - used inside a 3D model's offset/scale/rotate.
 */
export class KicadElementXYZ extends KicadElement {
	override name = 'xyz';
	x: number = 0;
	y: number = 0;
	z: number = 0;

	constructor(x?: number, y?: number, z?: number) {
		super();
		if (x !== undefined) {
			this.x = x;
		}
		if (y !== undefined) {
			this.y = y;
		}
		if (z !== undefined) {
			this.z = z;
		}
	}

	override afterParse() {
		if (this.attributes.length !== 3) {
			throw new Error(`${ this.name } expects 3 attributes, got ${ this.attributes.length }`);
		}

		this.x = this.attributes[0].value as number;
		this.y = this.attributes[1].value as number;
		this.z = this.attributes[2].value as number;
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${ this.name } ${ this.x } ${ this.y } ${ this.z })`;
	}
}