import { WithEffects }              from './Mixins/WithEffects';
import { WithOrigin }               from './Mixins/WithOrigin';
import { WithJustify }              from './Mixins/WithJustify';
import { KicadElementUnlocked }     from './KicadElementBoolean';
import { KicadElementLayer }        from './KicadElementLayer';
import { KicadElementUUID }         from './KicadElementUUID';
import { KicadElement, KicadLayer } from './KicadElement';

export class KicadElementProperty extends WithOrigin(WithEffects(WithJustify(KicadElement))) {
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
}