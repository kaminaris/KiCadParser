import { KicadElement } from './KicadElement';

export class KicadElementLayer extends KicadElement {
	override name = 'layer';
	// layer: string = '';
	// knockout: boolean = false;
	//
	// override afterParse() {
	// 	if (this.attributes.length > 2) {
	// 		console.log(this);
	// 		throw new Error(`${this.name} expects exactly 1-2 attribute, got ${this.attributes.length}`);
	// 	}
	//
	// 	this.layer = this.attributes[0].value as string;
	//
	// 	if (this.attributes.length === 2) {
	// 		this.knockout = this.attributes[1].value === 'knockout';
	// 	}
	//
	// 	this.attributes.length = 0;
	// }
	//
	// override write(): string {
	// 	const knockout = this.knockout ? ' knockout' : '';
	// 	return this.pad() + `(${this.name} "${this.value}${knockout}")`;
	// }
}
