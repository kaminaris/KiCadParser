import { WithLayerColor } from './Mixins/WithLayerColor';
import { WithWidth }      from './Mixins/WithWidth';
import { KicadElement }   from './KicadElement';
import { WithFill }       from './Mixins/WithFill';
import { WithStartEnd }   from './Mixins/WithStartEnd';
import { WithStroke }     from './Mixins/WithStroke';
import { WithLayer }      from './Mixins/WithLayer';

export class KicadElementRectangle extends WithStartEnd(WithFill(WithStroke(KicadElement))) {
	override name = 'rectangle';

	constructor(sX: number, sY: number, eX: number, eY: number) {
		super();
		this.setStartEnd(sX, sY, eX, eY);
	}
}

export class KicadElementGrLine extends WithLayer(WithLayerColor(WithStartEnd(WithFill(WithStroke(KicadElement))))) {
	override name = 'gr_line';
}

export class KicadElementSegment extends WithLayer(
	WithLayerColor(WithStartEnd(WithFill(WithStroke(WithWidth(KicadElement)))))) {
	override name = 'segment';
}

export class KicadElementGrRect extends WithLayer(WithLayerColor(WithStartEnd(WithFill(WithStroke(KicadElement))))) {
	override name = 'gr_rect';
}

export class KicadElementFpLine extends WithLayer(WithStroke(WithStartEnd(KicadElement))) {
	override name = 'fp_line';

	constructor(startX?: number, startY?: number, endX?: number, endY?: number) {
		super();
		this.setStartEnd(startX, startY, endX, endY);
	}
}