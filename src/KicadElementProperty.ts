import { KicadElementEffects }      from './KicadElementEffects';
import { KicadElementAt }           from './KicadElementAt';
import { KicadElementLayer }        from './KicadElementLayer';
import { KicadElementUnlocked }     from './KicadElementUnlocked';
import { KicadElementUUID }         from './KicadElementUUID';
import { KicadElement, KicadLayer } from './KicadElement';

export class KicadElementProperty extends KicadElement {
	override name = 'property';
	propertyName?: string;
	literalName?: boolean;
	propertyValue?: string;

	constructor(name?: string, value?: string) {
		super();
		if (name !== undefined) {
			this.propertyName = name;
		}
		if (value !== undefined) {
			this.propertyValue = value;
		}
	}

	setOrigin(x: number, y: number, size?: number) {
		let found = this.findFirstChildByClass(KicadElementAt);
		if (!found) {
			found = new KicadElementAt();
			this.addChild(found);
		}
		found.x = x;
		found.y = y;

		if (size !== undefined) {
			found.size = size;
		}
	}

	setUnlocked(unlocked: boolean) {
		let found = this.findFirstChildByClass(KicadElementUnlocked);
		if (!found) {
			found = new KicadElementUnlocked();
			this.addChild(found);
		}
		found.value = unlocked;
	}

	setLayer(layer: KicadLayer) {
		let found = this.findFirstChildByClass(KicadElementLayer);
		if (!found) {
			found = new KicadElementLayer();
			this.addChild(found);
		}
		// found.value = layer;
	}

	addUuid() {
		const uuid = crypto.randomUUID();
		const newUuidElement = new KicadElementUUID(uuid);
		this.children.push(newUuidElement);
	}

	override afterParse() {
		if (this.attributes.length > 2) {
			console.log(this);
			throw new Error('Property element must have exactly two attributes: name and value.');
		}

		if (this.attributes.length > 0) {
			this.propertyName = this.attributes[0]?.value as string;
			if (this.attributes[0].format === 'literal') {
				this.literalName = true;
			}
		}

		if (this.attributes.length === 2) {
			this.propertyValue = this.attributes[1]?.value as string;
		}

		this.attributes.length = 0;
	}

	override write(): string {
		let n = this.escapeString(this.propertyName as string);
		let v = '';
		if (this.propertyValue !== undefined) {
			v = ' "' + this.escapeString(this.propertyValue)+'"';
		}
		if (!this.literalName) {
			n = `"${ n }"`;
		}
		const pre = this.pad() + `(${ this.name } ${ n }${ v }`;
		if (this.children.length === 0) {
			return `${pre})`;
		}

		return `${ pre }\n${ this.writeChildren() }\n${ this.pad() })`;
	}

	// constructor(name: string, value: string, x: number, y: number, z?: number) {
	// 	super();
	// 	this.propertyName = name;
	// 	this.propertyValue = value;
	// 	this.origin = new KicadElementOrigin(x, y, z ?? 0);
	// }
	//
	// override write(): string {
	// 	const out = [];
	// 	out.push(`property "${ this.propertyName }" "${ this.propertyValue }"`);
	// 	out.push(this.origin.write());
	// 	if (this.layer) {
	// 		out.push(`(layer "${ this.layer }")`);
	// 	}
	// 	if (this.unlocked) {
	// 		out.push('(unlocked yes)');
	// 	}
	// 	if (this.hidden) {
	// 		out.push('(hide yes)');
	// 	}
	// 	if (this.uuid) {
	// 		out.push(this.uuid.write());
	// 	}
	// 	out.push(this.effects.write());
	// 	return `(${ out.join(' ') })`;
	// }

	getOrCreateEffects(): KicadElementEffects {
		let effChild = this.findFirstChildByClass(KicadElementEffects);
		if (!effChild) {
			effChild = new KicadElementEffects();
			this.addChild(effChild);
		}
		return effChild;
	}

	setFont(width: number, height: number, italic?: boolean, bold?: boolean) {
		let effChild = this.getOrCreateEffects();
		effChild.setFont(width, height, italic, bold);
	}

	setHidden(b: boolean) {
		let effChild = this.getOrCreateEffects();
		effChild.setHidden(b);
	}
}