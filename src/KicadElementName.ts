import { KicadElement } from './KicadElement';

export class KicadElementName extends KicadElement {
	override name = 'name';

	constructor(value?: string) {
		super();
		if (value !== undefined) {
			this.attributes.push({ format: 'quoted', value: value });
		}
	}

	setValue(value: string) {
		if (this.attributes.length < 1) {
			this.attributes.push({ format: 'quoted', value: value });
		}
		this.attributes[0].value = value;
	}

	getValue(): string {
		return this.attributes[0]?.value as string ?? '';
	}
}
