import { KicadElementShapeBase } from './KicadElementShapeBase';
import { KicadElementPts }       from './KicadElementPts';
import { KicadElementXY }        from './KicadElementXY';

/**
 * (polyline
 * 	(pts
 * 	(xy -1.27 -1.27) (xy -1.27 1.27) (xy -0.762 1.27)
 * 	)
 * 	(stroke (width 0.254) (type default))
 * 	(fill (type none))
 * )
 */
export class KicadElementPolyline extends KicadElementShapeBase {
	override name = 'polyline';

	getPoints(): Array<{ x: number, y: number }> {
		const pts = this.findFirstChildByClass(KicadElementPts);
		if (!pts) {
			return [];
		}
		const type = pts.findChildrenByClass(KicadElementXY);
		return type.map(p => ({ x: p.x, y: p.y }));
	}
}