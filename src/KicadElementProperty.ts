import { WithLayer }                              from './Mixins/WithLayer';
import { WithEffects }                            from './Mixins/WithEffects';
import { WithOrigin }                             from './Mixins/WithOrigin';
import { WithJustify }                            from './Mixins/WithJustify';
import { WithUUID }                               from './Mixins/WithUUID';
import {
	KicadElementDoNotAutoplace,
	KicadElementHide,
	KicadElementShowName,
	KicadElementUnlocked
} from './KicadElementBoolean';
import { KicadElementEffects } from './KicadElementEffects';
import { KicadElement }                           from './KicadElement';

export class KicadElementProperty extends WithUUID(WithLayer(WithOrigin(WithEffects(WithJustify(KicadElement))))) {
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

	/** @deprecated use setUuid() (from WithUUID) instead */
	addUuid() {
		this.setUuid();
	}

	override isHidden(): boolean {
		// KiCad 10 stores `(hide yes)` as a direct child of property.
		// Older files nest it inside `(effects … (hide yes))`.
		const hideChild = this.findFirstChildByClass(KicadElementHide);
		if (hideChild) {
			return hideChild.value;
		}
		const effects = this.findFirstChildByClass(KicadElementEffects);
		return effects ? effects.isHidden() : false;
	}

	/**
	 * KiCad 10 library properties write `(hide yes)` as a sibling of `(effects …)`,
	 * not nested under effects.
	 */
	override setHidden(value: boolean) {
		const effects = this.findFirstChildByClass(KicadElementEffects);
		const effectsHide = effects?.findFirstChildByClass(KicadElementHide);
		if (effectsHide && effects) {
			const idx = effects.children.indexOf(effectsHide);
			if (idx >= 0) {
				effects.children.splice(idx, 1);
			}
		}
		const found = this.findFirstChildByClass(KicadElementHide);
		if (!value) {
			if (found) {
				const idx = this.children.indexOf(found);
				if (idx >= 0) {
					this.children.splice(idx, 1);
				}
			}
			return;
		}
		if (!found) {
			const hide = new KicadElementHide();
			hide.value = true;
			this.addChild(hide);
			return;
		}
		found.value = true;
	}

	/** KiCad 10: `(show_name yes|no)`. */
	setShowName(show: boolean): this {
		const el = this.findOrCreateChildByClass(KicadElementShowName);
		el.value = show;
		return this;
	}

	getShowName(): boolean {
		return this.findFirstChildByClass(KicadElementShowName)?.value ?? false;
	}

	/** KiCad 10: `(do_not_autoplace yes|no)`. */
	setDoNotAutoplace(value: boolean): this {
		const el = this.findOrCreateChildByClass(KicadElementDoNotAutoplace);
		el.value = value;
		return this;
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
