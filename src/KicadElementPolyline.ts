import { KicadElement }          from './KicadElement';
import { WithFill }              from './Mixins/WithFill';
import { WithLayer }             from './Mixins/WithLayer';
import { WithPts }               from './Mixins/WithPts';
import { WithStroke }            from './Mixins/WithStroke';

/**
 * (polyline
 * 	(pts
 * 	(xy -1.27 -1.27) (xy -1.27 1.27) (xy -0.762 1.27)
 * 	)
 * 	(stroke (width 0.254) (type default))
 * 	(fill (type none))
 * )
 */
export class KicadElementPolyline extends WithPts(WithStroke(WithFill(KicadElement))) {
	override name = 'polyline';
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
export class KicadElementBezier extends WithPts(WithStroke(WithFill(KicadElement))) {
	override name = 'bezier';
}

/**
 * 	(gr_curve
 * 		(pts
 * 			(xy -3.22 -0.565) (xy 0.565 4.715) (xy -2.825 -4.215) (xy 0 0)
 * 		)
 * 		(stroke (width 0.1) (type default))
 * 		(layer "F.SilkS")
 * 		(uuid "5cf110ae-254e-4f09-aaa3-a08317319d78")
 * 	)
 */
export class KicadElementGrCurve extends WithLayer(WithPts(WithStroke(WithFill(KicadElement)))) {
	override name = 'gr_curve';
}