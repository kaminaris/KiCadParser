import { KicadElementRadius }                  from './KicadElementNumeric';
import { KicadElementShapeBase }               from './KicadElementShapeBase';
import { KicadElementCenter, KicadElementMid } from './KicadElementXY';

/**
 * (circle
 * 	(center 0 3.302)
 * 	(radius 0.762)
 * 	(stroke (width 0) (type default))
 * 	(fill (type none))
 * )
 */
export class KicadElementCircle extends KicadElementShapeBase {
	override name = 'circle';

	constructor(
		centerX?: number,
		centerY?: number,
		radius?: number
	) {
		super();

		if (centerX !== undefined && centerY !== undefined) {
			const s = new KicadElementCenter(centerX, centerY);
			this.addChild(s);
		}

		if (radius !== undefined) {
			const e = new KicadElementRadius(radius);
			this.addChild(e);
		}
	}
}