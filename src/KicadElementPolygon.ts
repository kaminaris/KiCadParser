import { WithLayerColor } from './Mixins/WithLayerColor';
import { WithLayer }      from './Mixins/WithLayer';
import { WithPts }        from './Mixins/WithPts';
import { WithStroke }     from './Mixins/WithStroke';
import { KicadElement }   from './KicadElement';

export class KicadElementPolygon extends WithPts(KicadElement) {
	value: string = 'polygon';
}

export class KicadElementGrPoly extends WithPts(WithStroke(WithLayer(WithLayerColor(KicadElement)))) {
	override name = 'gr_poly';
}

export class KicadElementFilledPolygon extends WithPts(WithLayer(KicadElement)) {
	override name = 'filled_polygon';
}