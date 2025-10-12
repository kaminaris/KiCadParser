import { WithFill }       from './Mixins/WithFill';
import { WithRadius }     from './Mixins/WithRadius';
import { WithLayerColor } from './Mixins/WithLayerColor';
import { KicadElement }   from './KicadElement';
import { WithCenter }     from './Mixins/WithCenter';
import { WithEnd }        from './Mixins/WithEnd';
import { WithLayer }      from './Mixins/WithLayer';
import { WithStroke }     from './Mixins/WithStroke';

/**
 * (circle
 * 	(center 0 3.302)
 * 	(radius 0.762)
 * 	(stroke (width 0) (type default))
 * 	(fill (type none))
 * )
 */
export class KicadElementCircle extends WithStroke(WithFill(WithCenter(WithRadius(KicadElement)))) {
	override name = 'circle';

	constructor(
		centerX?: number,
		centerY?: number,
		radius?: number
	) {
		super();

		this.setCenter(centerX, centerY);
		this.setRadius(radius);
	}
}

export class KicadElementGrCircle extends WithLayer(WithLayerColor(WithStroke(WithEnd(WithCenter(KicadElement))))) {
	override name = 'gr_circle';
}

export class KicadElementFpCircle extends WithLayer(WithLayerColor(WithStroke(WithEnd(WithCenter(KicadElement))))) {
	override name = 'fp_circle';

	constructor(centerX?: number, centerY?: number, radius?: number) {
		super();
		this.setCenter(centerX, centerY);
		// this.setRadius(radius);
	}
}