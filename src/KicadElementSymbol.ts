import { KicadElement }         from './KicadElement';
import { KicadElementProperty } from './KicadElementProperty';

export class KicadElementSymbol extends KicadElement {
	override name = 'symbol';
	symbolName?: string;

	constructor(symbolName?: string) {
		super();
		if (symbolName) {
			this.symbolName = symbolName;
		}
	}

	setSymbolName(name: string) {
		this.symbolName = name;
	}

	getLibraryName(): string | undefined {
		if (!this.symbolName) {
			return undefined;
		}
		const parts = this.symbolName.split(':');
		if (parts.length === 2) {
			return parts[0];
		}
		return undefined;
	}

	getAllProperties(): Record<string, string> {
		const props: Record<string, string> = {};
		for (const child of this.children) {
			if (child instanceof KicadElementProperty) {
				props[child.propertyName!] = child.propertyValue!;
			}
		}
		return props;
	}

	static filterRealSymbols(symbols: KicadElementSymbol[]): KicadElementSymbol[] {
		return symbols.filter(s => {
			const props = s.getAllProperties();
			if (!props['Reference']) {
				return false;
			}
			if (props['Reference'].startsWith('~') || props['Reference'].startsWith('#')) {
				return false;
			}
			return true;
		});
	}

	getPropertyByName(name: string): KicadElementProperty | undefined {
		return this.children.find(
			c => c instanceof KicadElementProperty && c.propertyName === name) as KicadElementProperty | undefined;
	}

	setProperty(name: string, value: string) {
		let prop = this.children.find(
			c => c instanceof KicadElementProperty && c.propertyName === name) as KicadElementProperty | undefined;
		if (!prop) {
			prop = new KicadElementProperty(name, value);
			this.children.push(prop);
		}
		else {
			prop.propertyValue = value;
		}
	}

	addBaselineProperties() {
		/**
		 * (property "Reference" "U"
		 *     (at -6.35 6.35 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *     )
		 * )
		 */
		const refProp = new KicadElementProperty('Reference', 'U');
		refProp.setOrigin(-6.35, 6.35, 0);
		refProp.setFont(1.27, 1.27);
		this.children.push(refProp);

		/**
		 * (property "Value" "ISO1050DUB"
		 *     (at 2.54 6.35 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *     )
		 * )
		 */
		const valProp = new KicadElementProperty('Value', 'SymbolValue');
		valProp.setOrigin(2.54, 6.35, 0);
		valProp.setFont(1.27, 1.27);
		this.children.push(valProp);

		/**
		 * (property "Footprint" "Package_SO:SOP-8_6.62x9.15mm_P2.54mm"
		 *     (at 0 -8.89 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *             (italic yes)
		 *         )
		 *         (hide yes)
		 *     )
		 * )
		 */
		const footprintProp = new KicadElementProperty('Footprint', '');
		footprintProp.setOrigin(0, -8.89, 0);
		footprintProp.setFont(1.27, 1.27, true);
		footprintProp.setHidden(true);
		this.children.push(footprintProp);

		/**
		 * (property "Datasheet" "http://www.ti.com/lit/ds/symlink/iso1050.pdf"
		 *     (at 0 -1.27 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *         (hide yes)
		 *     )
		 * )
		 */
		const datasheetProp = new KicadElementProperty('Datasheet', '');
		datasheetProp.setOrigin(0, -1.27, 0);
		datasheetProp.setFont(1.27, 1.27);
		datasheetProp.setHidden(true);
		this.children.push(datasheetProp);

		/**
		 * (property "Description" "Isolated CAN Transceiver, SOP-8"
		 *     (at 0 0 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *         (hide yes)
		 *     )
		 * )
		 */
		const descriptionProp = new KicadElementProperty('Description', '');
		descriptionProp.setOrigin(0, 0, 0);
		descriptionProp.setFont(1.27, 1.27);
		descriptionProp.setHidden(true);

		this.children.push(descriptionProp);
	}

	override afterParse() {
		// first attribute is the symbol name
		if (this.attributes.length > 0) {
			this.symbolName = this.attributes[0].value as string;
			// remove first attribute
			this.attributes.splice(0, 1);
		}
	}

	override write(): string {
		const attrs = this.formatAttributes();
		let attrStr = this.symbolName !== undefined ? ` "${ this.escapeString(this.symbolName) }"` : '';
		attrStr +=  (attrs.length > 0 ? ' ' + attrs.join(' ') : '');

		if (this.children.length === 0) {
			return this.pad() + `(${ this.name }${ attrStr })`;
		}

		return this.pad() + `(${ this.name }${ attrStr }\n${ this.writeChildren() }\n${ this.pad() })`;
	}
}