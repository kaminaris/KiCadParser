import { Ctor }              from './Ctor';
import { KicadElementPts }   from '../KicadElementPts';
import { KicadElementXY }    from '../KicadElementXY';
import { KicadElement }      from '../KicadElement';

export function WithPts<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		getPoints(): Array<{ x: number, y: number }> {
			const pts = this.findFirstChildByClass(KicadElementPts);
			if (!pts) {
				return [];
			}
			const type = pts.findChildrenByClass(KicadElementXY);
			return type.map(p => ({ x: p.x, y: p.y }));
		}

		setPoints(points: Array<{ x: number, y: number }>) {
			let pts = this.findOrCreateChildByClass(KicadElementPts);
			pts.children.length = 0;

			for (const point of points) {
				const xy = new KicadElementXY(point.x, point.y);
				pts.addChild(xy);
			}
		}
	};
}