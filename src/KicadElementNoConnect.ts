import { KicadElementAt } from './KicadElementAt';
import { KicadElement }   from './KicadElement';

export class KicadElementNoConnect extends KicadElement {
	override name = 'no_connect';

	getOrigin(): { x: number, y: number } {
		const at = this.findFirstChildByClass(KicadElementAt);
		if (!at) {
			return { x: 0, y: 0 };
		}
		return { x: at.x, y: at.y };
	}
}