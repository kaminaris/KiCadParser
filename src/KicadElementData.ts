import { KicadElement } from './KicadElement';

export class KicadElementData extends KicadElement {
	data?: string;
	quoteChar = '"';

	override afterParse() {
		if (this.attributes.length < 1) {
			throw new Error('KicadElementData requires at least one attribute for width');
		}

		// data is stored as a base64 string in the all attributes and split by max of 76 chars
		// x5X/V1srtGQ4kTN9oX8YA4hkCJE1CFXdzpyBWnXBH3ND0NG/JmjpFxozut0LckMlhBKI/pDUUozp
		// it can be escaped either by " or |

		// check if first char in first attribute is a quote
		const firstAttr = this.attributes[0].value as string;
		if (firstAttr[0] === '|') {
			this.quoteChar = '|';
			// remove first char from first attribute and last char from last attribute
			this.attributes[0].value = firstAttr.substring(1);
			const lastAttr = this.attributes[this.attributes.length - 1].value as string;
			this.attributes[this.attributes.length - 1].value = lastAttr.substring(0, lastAttr.length - 1);
		}

		let combined = '';
		for (const attribute of this.attributes) {
			combined += attribute.value as string;
		}
		// this.attributes.length = 0;
		this.data = window.atob(combined);
	}

	escapeDataLine(line: string, index: number): string {
		if (this.quoteChar === '"') {
			return '"' + line + '"';
		}
		else {
			if (index === 0) {
				return '|' + line;
			}
			else if (index === -1) {
				return line + '|';
			}
			else {
				return line;
			}
		}
	}

	override write(): string {
		if (!this.data) {
			throw new Error('No data to write');
		}

		const base64String = window.btoa(this.data);
		const maxLineLength = 76;
		const lines = [];
		for (let i = 0; i < base64String.length; i += maxLineLength) {
			lines.push(base64String.substring(i, i + maxLineLength));
		}

		for (let j = 0; j < lines.length; j++) {
			lines[j] = this.escapeDataLine(lines[j], j === 0 ? 0 : (j === lines.length - 1 ? -1 : 1));
		}

		let out = this.pad() + '(data ';
		if (lines.length === 1) {
			return out + lines[0] + ')';
		}

		out += lines[0] + '\n';
		for (let j = 1; j < lines.length; j++) {
			out += this.pad(1) + lines[j] + '\n';
		}

		out += this.pad() + ')';
		return out;
	}
}