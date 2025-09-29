import { KicadElement } from './KicadElement';

export class KicadElementComment extends KicadElement {
	override name = 'comment';

	index: number = 0;
	value: string = '';

	constructor(i?: number, v?: string) {
		super();
		if (i !== undefined) {
			this.index = i;
		}
		if (v !== undefined) {
			this.value = v;
		}
	}

	override afterParse() {
		if (this.attributes.length !== 2) {
			throw new Error(`KicadElementComment expects exactly two attributes, got ${ this.attributes.length }`);
		}

		this.index = parseInt(this.attributes[0].value as string);
		this.value = this.attributes[1].value as string;
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${ this.name } ${ this.index } "${ this.value }")`;
	}
}