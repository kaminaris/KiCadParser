import { KicadElement } from './KicadElement';

export class KicadElementPolygon extends KicadElement {
	value: string = 'polygon';

	// override afterParse() {
	// 	if (this.attributes.length !== 1) {
	// 		throw new Error(`KicadElementType expects exactly one attribute, got ${this.attributes.length}`);
	// 	}
	//
	// 	this.value = this.attributes[0].value as string;
	// 	this.attributes.length = 0;
	// }
	//
	// override write(): string {
	// 	return this.pad() + `(type ${this.value})`;
	// }
}