import { KicadElement } from './KicadElement';

export class KicadElementText extends KicadElement {
	value: string = '';

	constructor(v?: string) {
		super();
		if (v !== undefined) {
			this.value = v;
		}
	}

	override afterParse() {
		if (this.attributes.length !== 1) {
			console.log(this);
			throw new Error(`${ this.name } expects exactly one attribute, got ${ this.attributes.length }`);
		}

		this.value = this.attributes[0].value as string;
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${ this.name } "${ this.value }"\n${ this.writeChildren() }\n${ this.pad() })`;
	}
}