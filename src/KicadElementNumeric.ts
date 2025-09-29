import { KicadElement } from './KicadElement';

export class KicadElementNumeric extends KicadElement {
	value: number = 0;

	constructor(v?: number) {
		super();
		if (v !== undefined) {
			this.value = v;
		}
	}

	override afterParse() {
		if (this.attributes.length !== 1) {
			throw new Error(`KicadElementNumber expects exactly one attribute, got ${ this.attributes.length }`);
		}

		this.value = this.attributes[0].value as number;
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${ this.name } ${ this.value })`;
	}
}
