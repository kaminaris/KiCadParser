import { KicadElementPts } from './KicadElementPts';
import { KicadElementXY }  from './KicadElementXY';
import { KicadElement }    from './KicadElement';

export class KicadElementWire extends KicadElement {
	override name = 'wire';

	getPoints(): Array<{ x: number, y: number }> {
		const pts = this.findFirstChildByClass(KicadElementPts);
		if (!pts) {
			return [];
		}
		const type = pts.findChildrenByClass(KicadElementXY);
		return type.map(p => ({ x: p.x, y: p.y }));
	}
}