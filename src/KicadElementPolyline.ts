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

/**
 * (bezier
 * 	(pts
 * 		(xy 153.67 60.96) (xy 176.53 62.23) (xy 152.4 77.47) (xy 182.88 87.63)
 * 	)
 * 	(stroke (width 0) (type default))
 * 	(fill (type none))
 * 	(uuid d14c3946-d818-4e0a-9944-0b0722dae728)
 * )
 */
export class KicadElementBezier extends KicadElementShapeBase {
	override name = 'bezier';

	getPoints(): Array<{ x: number, y: number }> {
		const pts = this.findFirstChildByClass(KicadElementPts);
		if (!pts) {
			return [];
		}
		const type = pts.findChildrenByClass(KicadElementXY);
		return type.map(p => ({ x: p.x, y: p.y }));
	}
}