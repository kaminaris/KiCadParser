/**
 * plain - as-is, no quotation
 * string - double-quoted
 * complex - nested in brackets ()
 */
export type KicadElementType = 'plain' | 'string' | 'complex';
export type KicadLayer = '' | 'F.SilkS' | 'F.Cu' | 'F.Fab' | 'F.CrtYd';
export type KicadNodeName = 'kicad_sch' | 'version' | 'generator' | 'generator_version';

export interface KicadAttribute {
	value: string | number | boolean;
	format: 'quoted' | 'literal' | 'numeric' | 'boolean';
}

export class KicadElement {
	name = '';
	attributes: KicadAttribute[] = [];
	readonly children: KicadElement[] = [];
	rootLevel = 0;
	parent?: KicadElement;

	addChild(node: KicadElement) {
		node.rootLevel = this.rootLevel + 1;
		node.parent = this;
		this.children.push(node);
	}

	clearChildren() {
		this.children.length = 0;
	}

	setAttribute(attr: KicadAttribute, index?: number) {
		if (index !== undefined) {
			if (index >= this.attributes.length) {
				// Fill in any gaps with empty attributes
				while (this.attributes.length < index) {
					this.attributes.push({ format: 'literal', value: '' });
				}
			}
			this.attributes[index] = attr;
		} else {
			this.attributes.push(attr);
		}
	}

	findFirstChildByName(name: string): KicadElement | undefined {
		return this.children.find(c => c.name === name);
	}

	findFirstChildByClass<T extends KicadElement>(cls: new (...args: any[]) => T): T | undefined {
		return this.children.find(c => c instanceof cls) as T | undefined;
	}

	findChildrenByName(name: string): KicadElement[] {
		return this.children.filter(c => c.name === name);
	}

	findAllChildrenByName(name: string): KicadElement[] {
		let results: KicadElement[] = [];
		for (const child of this.children) {
			if (child.name === name) {
				results.push(child);
			}
			results = results.concat(child.findAllChildrenByName(name));
		}

		return results;
	}

	findChildrenByClass<T extends KicadElement>(cls: new (...args: any[]) => T): T[] {
		return this.children.filter(c => c instanceof cls) as T[];
	}

	findOrCreateChildByClass<T extends KicadElement>(cls: new (...args: any[]) => T): T {
		let found = this.findFirstChildByClass(cls);
		if (!found) {
			found = new cls();
			this.addChild(found);
		}
		return found;
	}

	getProperties() {
		return this.children.filter(c => c.name === 'property');
	}

	findAllChildrenByClass<T extends KicadElement>(cls: new (...args: any[]) => T): T[] {
		let results: T[] = [];
		for (const child of this.children) {
			if (child instanceof cls) {
				results.push(child as T);
			}
			results = results.concat(child.findAllChildrenByClass(cls));
		}

		return results;
	}

	pad(additionalLevels = 0): string {
		return '\t'.repeat(this.rootLevel + additionalLevels);
	};

	escapeString(str: string): string {
		return String(str).replace(/"/g, '\\"');
	}

	formatAttributes(): string[] {
		return this.attributes.map(attr => {
			switch (attr.format) {
				case 'quoted':
					// Escape any quotes in the string value
					const escapedValue = this.escapeString(attr.value as string);
					return `"${ escapedValue }"`;
				case 'boolean':
					return attr.value ? 'yes' : 'no';
				case 'numeric':
				case 'literal':
				default:
					return attr.value.toString();
			}
		});
	}

	write(): string {
		// Format attributes based on their format property
		const attrs = this.formatAttributes();

		const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

		if (this.children.length === 0) {
			return this.pad() + `(${ this.name }${ attrStr })`;
		}

		return this.pad() + `(${ this.name }${ attrStr }\n${ this.writeChildren() }\n${ this.pad() })`;
	}

	afterParse() {
		// Override in subclasses for any post-processing after parsing
	}

	writeChildren(): string {
		return this.children.map(c => {
			// Ensure child has proper indentation level before writing
			c.rootLevel = this.rootLevel + 1;
			return c.write();
		}).join('\n');
	}

	round(x: number) {
		return Math.round(x * 1000) / 1000;
	}
}