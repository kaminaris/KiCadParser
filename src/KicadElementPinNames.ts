import { KicadElementHide } from './KicadElementBoolean';
import { KicadElementOffset } from './KicadElementOffset';
import { KicadElement } from './KicadElement';

/**
 * `(pin_names (offset 0.254) (hide yes))` — or KiCad 8 bare `(pin_names … hide)`.
 */
export class KicadElementPinNames extends KicadElement {
	override name = 'pin_names';

	setOffset(offsetMm: number): this {
		const offset = this.findOrCreateChildByClass(KicadElementOffset);
		offset.setSimpleValue(offsetMm);
		return this;
	}

	getOffset(): number {
		const offset = this.findFirstChildByClass(KicadElementOffset);
		return offset?.offset ?? 0;
	}

	/**
	 * KiCad 8 wrote bare `hide` attribute; KiCad 9/10 write `(hide yes)`.
	 */
	isHidden(): boolean {
		const hideChild = this.findFirstChildByClass(KicadElementHide);
		if (hideChild) {
			return hideChild.value;
		}
		return this.attributes.some(a => a.value === 'hide' || a.value === true);
	}

	setHidden(hidden: boolean): this {
		// Drop legacy bare-attribute form when writing modern `(hide yes)`.
		this.attributes = this.attributes.filter(
			a => a.value !== 'hide' && a.value !== true
		);
		const existing = this.findFirstChildByClass(KicadElementHide);
		if (!hidden) {
			// KiCad 10 omits `(hide no)` — visible names are offset-only.
			if (existing) {
				const idx = this.children.indexOf(existing);
				if (idx >= 0) {
					this.children.splice(idx, 1);
				}
			}
			return this;
		}
		const hide = existing ?? this.findOrCreateChildByClass(KicadElementHide);
		hide.value = true;
		return this;
	}
}
