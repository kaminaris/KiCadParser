import { WithLayerColor }  from './Mixins/WithLayerColor';
import { KicadElement }    from './KicadElement';
import { WithFill }        from './Mixins/WithFill';
import { WithLayer }       from './Mixins/WithLayer';
import { WithStartMidEnd } from './Mixins/WithStartMidEnd';
import { WithStroke }      from './Mixins/WithStroke';
import { WithUUID }        from './Mixins/WithUUID';

/**
 * Symbol-library arcs carry no uuid; top-level SCHEMATIC arcs are a separate
 * real KiCad form that DOES (see kicad-io/test/fixtures/kicad-qa/eeschema/
 * api_kitchen_sink.kicad_sch). WithUUID covers both without a format split:
 * parsing never calls setUuid() on its own, so a parsed library arc simply has
 * no uuid child and write() reproduces that (getUuid() returns undefined,
 * nothing to emit); freshly-constructed schematic-root arcs get a real uuid
 * from an explicit setUuid() call at creation time.
 *
 * (arc
 * 	(start -2.032 -1.27)
 * 	(mid 0 -0.5572)
 * 	(end 2.032 -1.27)
 * 	(stroke (width 0.508) (type default))
 * 	(fill (type none))
 * )
 */
export class KicadElementArc extends WithUUID(WithStartMidEnd(WithStroke(WithFill(KicadElement)))) {
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
export class KicadElementGrArc extends WithUUID(WithLayer(WithLayerColor(WithStroke(WithStartMidEnd(WithFill(KicadElement)))))) {
	override name = 'gr_arc';
}

export class KicadElementFpArc extends WithUUID(WithStartMidEnd(WithLayer(WithLayerColor(WithStroke(WithStartMidEnd(WithFill(KicadElement))))))) {
	override name = 'fp_arc';
}