import { KicadElement }                        from 'src/app/Lib/Kicad/src/KicadElement';
import { WithCenter }                          from 'src/app/Lib/Kicad/src/Mixins/WithCenter';
import { WithEnd }                             from 'src/app/Lib/Kicad/src/Mixins/WithEnd';
import { WithLayer }                           from 'src/app/Lib/Kicad/src/Mixins/WithLayer';
import { WithStart }                           from 'src/app/Lib/Kicad/src/Mixins/WithStart';
import { WithStroke }                          from 'src/app/Lib/Kicad/src/Mixins/WithStroke';
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

	getCenterRadius(): { center: { x: number, y: number }, radius: number } {
		const center = this.findFirstChildByClass(KicadElementCenter);
		const radius = this.findFirstChildByClass(KicadElementRadius);
		return {
			center: { x: center?.x ?? 0, y: center?.y ?? 0 },
			radius: radius?.value ?? 0
		};
	}
}

export class KicadElementGrCircle extends WithLayer(WithStroke(WithEnd(WithCenter(KicadElement)))) {
	override name = 'gr_circle';
}