import { KicadElement } from './KicadElement';

export class KicadElementNet extends KicadElement {
	override name = 'net';
	id: number = 0;
	netName?: string;

	/** True for pad-level `(net "Name")` references that omit the numeric net ordinal. */
	nameOnly = false;

	override afterParse() {
		if (this.attributes.length > 2) {
			console.log(this);
			throw new Error(`KicadElementNet expects 1-2 attributes, got ${ this.attributes.length }`);
		}

		if (this.attributes[0]?.format === 'quoted') {
			// (net "Name") - a bare net-name reference, no numeric ordinal.
			this.nameOnly = true;
			this.netName = this.attributes[0].value as string;
		}
		else {
			this.id = parseInt(this.attributes[0].value as string);
			if (this.attributes.length > 1) {
				this.netName = this.attributes[1].value as string;
			}
		}

		this.attributes.length = 0;
	}

	override write(): string {
		if (this.nameOnly) {
			return this.pad() + `(${ this.name } "${ this.netName }")`;
		}
		const nn = this.netName !== undefined ? ` "${ this.netName }"` : '';
		return this.pad() + `(${ this.name } ${ this.id }${ nn })`;
	}
}