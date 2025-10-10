import { KicadElement } from './KicadElement';

export class KicadElementLayer extends KicadElement {
	override name = 'layer';

	getLayerName(): string {
		if (this.attributes.length < 1) {
			throw new Error(`${ this.name } expects exactly one attribute, got ${ this.attributes.length }`);
		}
		return this.attributes[0].value as string ?? '';
	}
}
