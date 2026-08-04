import { WithOrigin }     from './Mixins/WithOrigin';
import { WithUUID }       from './Mixins/WithUUID';
import { KicadElement }   from './KicadElement';
import { KicadElementAt } from './KicadElementAt';

export class KicadElementNoConnect extends WithUUID(WithOrigin(KicadElement)) {
	override name = 'no_connect';

	/** Grammar is (at x y) — no rotation slot. WithOrigin's rotation param
	 *  defaults to 0 and would write an invalid (at x y 0), so override to
	 *  never touch it. */
	override setOrigin(x: number, y: number): void {
		const at = this.findOrCreateChildByClass(KicadElementAt);
		at.x = x;
		at.y = y;
	}
}