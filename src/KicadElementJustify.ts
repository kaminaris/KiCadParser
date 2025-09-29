import { KicadElement } from './KicadElement';

export class KicadElementJustify extends KicadElement {
	horizonstal?: string; //'left' | 'middle' | 'right';
	vertical?: string; //'top' | 'middle' | 'bottom';
	mirrored?: boolean;

	override afterParse() {
		if (this.attributes.length > 3) {
			throw new Error(`KicadElementJustify expects at most 3 attributes, got ${ this.attributes.length }`);
		}

		// special case, check if last attribute is 'mirror'
		if (this.attributes.length >= 1 && this.attributes[this.attributes.length - 1].value === 'mirror') {
			this.mirrored = true;
			this.attributes.pop();
		}
		else {
			this.mirrored = false;
		}

		if (this.attributes.length >= 1) {
			const horiz = this.attributes[0].value as string;
			this.horizonstal = horiz as 'left' | 'middle' | 'right';

		}

		if (this.attributes.length === 2) {
			const vert = this.attributes[1].value as string;
			this.vertical = vert as 'top' | 'middle' | 'bottom';
		}

		this.attributes.length = 0;
	}

	override write(): string {
		const horizontal = this.horizonstal ? ' ' + this.horizonstal : '';
		const vertical = this.vertical ? ' ' + this.vertical : '';
		const mirror = this.mirrored ? ' mirror' : '';
		return this.pad() + `(justify${ horizontal }${ vertical }${ mirror })`;
	}
}