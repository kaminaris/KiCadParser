import { KicadElement } from './KicadElement';

export class KicadElementOffset extends KicadElement {
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
			`KicadElementOffset expects exactly one attribute or children, got ${ this.attributes.length } attributes and ${ this.children.length } children`
		);
	}

	override write(): string {
		if (!this.complex) {
			return this.pad() + `(offset ${ this.offset })`;
		}
		return super.write();
	}
}