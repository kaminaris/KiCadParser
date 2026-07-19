import { WithLayerColor } from './Mixins/WithLayerColor';
import { WithLayer }      from './Mixins/WithLayer';
import { WithPts }        from './Mixins/WithPts';
import { WithStroke }     from './Mixins/WithStroke';
import { WithUUID }       from './Mixins/WithUUID';
import { KicadElement }   from './KicadElement';

export class KicadElementPolygon extends WithPts(KicadElement) {
	value: string = 'polygon';
}

export class KicadElementGrPoly extends WithUUID(WithPts(WithStroke(WithLayer(WithLayerColor(KicadElement))))) {
	override name = 'gr_poly';
}

export class KicadElementFilledPolygon extends WithPts(WithLayer(KicadElement)) {
	override name = 'filled_polygon';
}

export class KicadElementFpPoly extends WithUUID(WithPts(WithStroke(WithLayer(WithLayerColor(KicadElement))))) {
	override name = 'fp_poly';
}