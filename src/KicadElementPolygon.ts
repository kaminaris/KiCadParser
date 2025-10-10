import { WithLayer }    from 'src/app/Lib/Kicad/src/Mixins/WithLayer';
import { WithPts }      from 'src/app/Lib/Kicad/src/Mixins/WithPts';
import { WithStroke }   from 'src/app/Lib/Kicad/src/Mixins/WithStroke';
import { KicadElement } from './KicadElement';

export class KicadElementPolygon extends WithPts(KicadElement) {
	value: string = 'polygon';
}

export class KicadElementGrPoly extends WithPts(WithStroke(WithLayer(KicadElement))) {
	override name = 'gr_poly';
}