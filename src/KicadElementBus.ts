import { WithPts }     from './Mixins/WithPts';
import { WithOrigin }  from './Mixins/WithOrigin';
import { WithSize }    from './Mixins/WithSize';
import { WithStroke }  from './Mixins/WithStroke';
import { WithUUID }    from './Mixins/WithUUID';
import { KicadElement } from './KicadElement';
import { KicadElementAt } from './KicadElementAt';

/**
 * (bus
 * 		(pts (xy 107.95 41.91) (xy 107.95 57.15))
 * 		(stroke (width 0) (type default))
 * 		(uuid "153f4574-d225-4b61-acb8-9b9cebc495be")
 * )
 */
export class KicadElementBus extends WithUUID(WithStroke(WithPts(KicadElement))) {
	override name = 'bus';
}

/**
 * (bus_entry
 * 		(at 69.85 62.23)
 * 		(size 2.54 -2.54)
 * 		(stroke (width 0) (type default))
 * 		(uuid "04da118f-01de-4320-a1f1-a104e9c695d9")
 * )
 */
export class KicadElementBusEntry extends WithUUID(WithStroke(WithSize(WithOrigin(KicadElement)))) {
	override name = 'bus_entry';

	/** Grammar is (at x y) — no rotation slot (orientation comes entirely
	 *  from `size`'s diagonal direction). Same fix as KicadElementNoConnect/
	 *  KicadElementJunction: WithOrigin's rotation param defaults to 0 and
	 *  would write an invalid (at x y 0), so override to never touch it. */
	override setOrigin(x: number, y: number): void {
		const at = this.findOrCreateChildByClass(KicadElementAt);
		at.x = x;
		at.y = y;
	}
}
