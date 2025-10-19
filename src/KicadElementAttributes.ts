import { KicadElement } from './KicadElement';

export class KicadElementAttributes extends KicadElement {
	override name = 'attr';

	hasAttribute(attrName: string): boolean {
		return this.attributes.find(a => a.value === attrName) !== undefined;
	}
}