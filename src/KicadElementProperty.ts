import { KicadElementFont }                             from 'src/app/Lib/Kicad/src/KicadElementFont';
import { KicadJustifyHorizontal, KicadJustifyVertical } from 'src/app/Lib/Kicad/src/KicadElementJustify';
import { KicadElementEffects }                          from './KicadElementEffects';
import { KicadElementAt }                               from './KicadElementAt';
import { KicadElementLayer }                            from './KicadElementLayer';
import { KicadElementUnlocked }                         from './KicadElementUnlocked';
import { KicadElementUUID }                             from './KicadElementUUID';
import { KicadElement, KicadLayer }                     from './KicadElement';

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

	setOrigin(x: number, y: number, rotation?: number) {
		let found = this.findFirstChildByClass(KicadElementAt);
		if (!found) {
			found = new KicadElementAt();
			this.addChild(found);
		}
		found.x = x;
		found.y = y;

		if (rotation !== undefined) {
			found.size = rotation;
		}
	}

	getOrigin(): { x: number, y: number, rotation: number } {
		const at = this.findFirstChildByClass(KicadElementAt);
		if (!at) {
			return { x: 0, y: 0, rotation: 0 };
		}

		return { x: at.x, y: at.y, rotation: at.size ?? 0 };
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
			v = ' "' + this.escapeString(this.propertyValue) + '"';
		}
		if (!this.literalName) {
			n = `"${ n }"`;
		}
		const pre = this.pad() + `(${ this.name } ${ n }${ v }`;
		if (this.children.length === 0) {
			return `${ pre })`;
		}

		return `${ pre }\n${ this.writeChildren() }\n${ this.pad() })`;
	}

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

	getFont(): { width: number, height: number, italic: boolean, bold: boolean } {
		const effChild = this.findFirstChildByClass(KicadElementEffects);
		if (!effChild) {
			return { width: 1.27, height: 1.27, italic: false, bold: false };
		}

		return effChild.getFont();
	}

	getJustify(): {
		horizontal: KicadJustifyHorizontal,
		vertical: KicadJustifyVertical,
		mirrored: boolean
	} {
		const effChild = this.findFirstChildByClass(KicadElementEffects);
		if (!effChild) {
			return { horizontal: 'middle', vertical: 'middle', mirrored: false };
		}

		return effChild.getJustify();
	}

	setHidden(b: boolean) {
		let effChild = this.getOrCreateEffects();
		effChild.setHidden(b);
	}

	isHidden(): boolean {
		const effChild = this.findFirstChildByClass(KicadElementEffects);
		if (!effChild) {
			return false;
		}

		return effChild.isHidden();
	}
}