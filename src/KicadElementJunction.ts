import { KicadElementAt }  from './KicadElementAt';
import { KicadElement }    from './KicadElement';

export class KicadElementJunction extends KicadElement {
	override name = 'junction';

	getOrigin(): { x: number, y: number } {
		const at = this.findFirstChildByClass(KicadElementAt);
		if (!at) {
			return { x: 0, y: 0 };
		}
		return { x: at.x, y: at.y };
	}
}