import { KicadElement } from './KicadElement';

export class KicadElementUUID extends KicadElement {
	uuid?: string;
	quoted = false;

	constructor(uuid?: string) {
		super();
		if (uuid) {
			this.uuid = uuid;
		}
	}

	override afterParse() {
		if (this.uuid) {
			return;
		}

		this.uuid = this.attributes[0].value as string;
		if (this.attributes[0].format === 'quoted') {
			this.quoted = true;
		}
		this.attributes.length = 0;
	}

	override write(): string {
		if (!this.uuid) {
			// Generate a new UUID if it doesn't exist
			this.uuid = crypto.randomUUID();
		}

		const uuidFormat = this.quoted ? `"${ this.uuid }"` : this.uuid;

		return this.pad() + `(uuid ${ uuidFormat })`;
	}
}