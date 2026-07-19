import { KicadElement }   from './KicadElement';
import { KicadElementXYZ } from './KicadElementXY';

/**
 * A handful of KiCad elements share this exact shape: either a single bare
 * numeric value (e.g. `(scale 0.75)` on an embedded image) or, with no
 * attributes, a nested `(xyz x y z)` triple (e.g. the offset/scale/rotate
 * of a footprint's 3D model). Both forms use the same tag name depending
 * purely on context, so a single class handles both.
 */
export abstract class KicadElementOffsetLike extends KicadElement {
	offset: number = 0;
	complex = false;

	override afterParse() {
		if (this.attributes.length === 1) {
			this.offset = parseFloat(this.attributes[0].value as string);
			this.attributes.length = 0;
			return;
		}

		if (this.children.length > 0) {
			this.complex = true;
			return;
		}

		throw new Error(
			`${ this.name } expects exactly one attribute or children, got ${ this.attributes.length } attributes and ${ this.children.length } children`
		);
	}

	setSimpleValue(value: number): this {
		this.complex = false;
		this.offset = value;
		this.clearChildren();
		return this;
	}

	setXYZ(x: number, y: number, z: number): this {
		this.complex = true;
		this.clearChildren();
		this.addChild(new KicadElementXYZ(x, y, z));
		return this;
	}

	getXYZ(): { x: number, y: number, z: number } | undefined {
		const xyz = this.findFirstChildByClass(KicadElementXYZ);
		return xyz ? { x: xyz.x, y: xyz.y, z: xyz.z } : undefined;
	}

	override write(): string {
		if (!this.complex) {
			return this.pad() + `(${ this.name } ${ this.offset })`;
		}
		return super.write();
	}
}

export class KicadElementOffset extends KicadElementOffsetLike {
	override name = 'offset';
}

export class KicadElementScale extends KicadElementOffsetLike {
	override name = 'scale';
}

export class KicadElementRotate extends KicadElementOffsetLike {
	override name = 'rotate';
}
