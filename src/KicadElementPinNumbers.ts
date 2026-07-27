import { KicadElementHide } from './KicadElementBoolean';
import { KicadElement }     from './KicadElement';

export class KicadElementPinNumbers extends KicadElement {
	override name = 'pin_numbers';

	/**
	 * KiCad 8 wrote `(pin_numbers hide)` (bare attribute); KiCad 9/10 write
	 * `(pin_numbers (hide yes))` (child). Accept both.
	 */
	isHidden(): boolean {
		const hideChild = this.findFirstChildByClass(KicadElementHide);
		if (hideChild) {
			return hideChild.value;
		}
		return this.attributes.some(a => a.value === 'hide' || a.value === true);
	}

	setHidden(hidden: boolean): this {
		this.attributes = this.attributes.filter(
			a => a.value !== 'hide' && a.value !== true
		);
		const existing = this.findFirstChildByClass(KicadElementHide);
		if (!hidden) {
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
