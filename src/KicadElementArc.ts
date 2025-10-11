import { KicadElement }                                        from './KicadElement';
import { WithFill }                                            from './Mixins/WithFill';
import { WithLayer }                                           from './Mixins/WithLayer';
import { WithStartMidEnd }                                     from './Mixins/WithStartMidEnd';
import { WithStroke }                                          from './Mixins/WithStroke';

/**
 * (arc
 * 	(start -2.032 -1.27)
 * 	(mid 0 -0.5572)
 * 	(end 2.032 -1.27)
 * 	(stroke (width 0.508) (type default))
 * 	(fill (type none))
 * )
 */
export class KicadElementArc extends WithStartMidEnd(WithStroke(WithFill(KicadElement))) {
	override name = 'arc';
}

/**
 * 	(gr_arc
 * 		(start -2.770867 -1.14773)
 * 		(mid 0 0)
 * 		(end 1.14773 2.770867)
 * 		(stroke (width 0.1) (type default))
 * 		(layer "F.SilkS")
 * 		(uuid "7a69040a-f568-4551-9a51-2ee12c0d7be7")
 * 	)
 */
export class KicadElementGrArc extends WithLayer(WithStroke(WithStartMidEnd(WithFill(KicadElement)))) {
	override name = 'gr_arc';
}