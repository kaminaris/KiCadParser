import { KicadElement } from './KicadElement';

export class KicadElementBoolean extends KicadElement {
	value: boolean = false;

	override afterParse() {
		if (this.attributes.length !== 1) {
			throw new Error(`KicadElementInBom expects exactly one attribute, got ${this.attributes.length}`);
		}

		this.value = this.attributes[0].value === 'yes' || this.attributes[0].value === true;
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${this.name} ${this.value ? 'yes' : 'no'})`;
	}
}
