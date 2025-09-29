import { KicadElement } from './KicadElement';

export class KicadElementSimple extends KicadElement {
	value: any;

	constructor(name: string, value: any) {
		super();
		this.name = name;
	}

	override write(): string {
		return this.pad() + `(${ this.name } ${ isNaN(this.value) ? `"${ this.value }"` : this.value })`;
	}
}