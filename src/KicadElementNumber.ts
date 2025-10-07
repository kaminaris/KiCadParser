import { KicadElement } from './KicadElement';

export class KicadElementNumber extends KicadElement {
	override name = 'number';

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
