import { WithProperties } from './Mixins/WithProperties';
import { WithSize }       from './Mixins/WithSize';
import { WithUUID }       from './Mixins/WithUUID';
import { KicadElementAt } from './KicadElementAt';
import { KicadElement }   from './KicadElement';

/**
 * (sheet (at x y) (size w h) (stroke …) (fill …) (uuid …) (property …)* (pin …)*)
 *
 * Position has no rotation slot (unlike WithOrigin, which every OTHER
 * movable element here uses) — a sheet box is always axis-aligned, real
 * KiCad has no "rotate a sheet" concept at all. getPosition/setPosition are
 * plain inline methods rather than a mixin for the same reason
 * KicadElementJunction's diameter/color are inline: a rotation-less 2-arg
 * `(at x y)` shape is only shared with junction/no-connect/bus-entry, each
 * of which ALREADY overrides WithOrigin's 3-arg default specifically to
 * avoid writing an invalid `(at x y 0)` — reusing that mixin here just to
 * immediately fight its own rotation parameter would be more code, not less.
 */
export class KicadElementSheet extends WithUUID(WithSize(WithProperties(KicadElement))) {
	override name = 'sheet';

	getPosition(): { x: number; y: number } {
		const at = this.findFirstChildByClass(KicadElementAt);
		return { x: at?.x ?? 0, y: at?.y ?? 0 };
	}

	setPosition(x: number, y: number): void {
		const at = this.findOrCreateChildByClass(KicadElementAt);
		at.x = x;
		at.y = y;
	}
}