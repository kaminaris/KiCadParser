import { KicadElement } from './KicadElement';

export class KicadElementLength extends KicadElement {
	value: number = 0;

	override afterParse() {
		if (this.attributes.length !== 1) {
			throw new Error(`KicadElementLength expects exactly one attribute, got ${this.attributes.length}`);
		}

		this.value = parseFloat(this.attributes[0].value as string);
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(length ${this.value})`;
	}
}
