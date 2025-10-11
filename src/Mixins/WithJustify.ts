import { KicadElementEffects }                                               from '../KicadElementEffects';
import { Ctor }                                                              from './Ctor';
import { KicadElementJustify, KicadJustifyHorizontal, KicadJustifyVertical } from '../KicadElementJustify';
import { KicadElement }                                                      from '../KicadElement';

export function WithJustify<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setJustify(
			horizontal?: KicadJustifyHorizontal,
			vertical?: KicadJustifyVertical,
			mirrored?: boolean
		) {
			const effects = this.findOrCreateChildByClass(KicadElementEffects);
			const justifyEl = effects.findOrCreateChildByClass(KicadElementJustify);
			justifyEl.setJustify(horizontal, vertical, mirrored);
		}

		getJustify(): {
			horizontal: KicadJustifyHorizontal,
			vertical: KicadJustifyVertical,
			mirrored: boolean
		} {
			const effects = this.findFirstChildByClass(KicadElementEffects);
			const justifyEl = effects?.findFirstChildByClass(KicadElementJustify);
			if (!justifyEl) {
				return { horizontal: 'middle', vertical: 'middle', mirrored: false };
			}
			return justifyEl.getJustify();
		}

		getAnchorPoint(): { x: number, y: number } {
			const justify = this.getJustify();
			let x = 0;
			let y = 0;

			switch (justify.horizontal) {
				case 'left':
					x = 0;
					break;
				case 'middle':
					x = 0.5;
					break;
				case 'right':
					x = 1;
					break;
			}

			switch (justify.vertical) {
				case 'top':
					y = 0;
					break;
				case 'middle':
					y = 0.5;
					break;
				case 'bottom':
					y = 1;
					break;
			}

			if (justify.mirrored) {
				x = 1 - x;
			}

			return { x, y };
		}
	};
}