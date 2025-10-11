import { KicadElement } from './KicadElement';
import { WithFill }     from './Mixins/WithFill';
import { WithStartEnd } from './Mixins/WithStartEnd';
import { WithStroke }   from './Mixins/WithStroke';
import { WithLayer }    from './Mixins/WithLayer';

export class KicadElementRectangle extends WithStartEnd(WithFill(WithStroke(KicadElement))) {
	override name = 'rectangle';

	constructor(sX: number, sY: number, eX: number, eY: number) {
		super();
		this.setStartEnd(sX, sY, eX, eY);
	}
}

export class KicadElementGrLine extends WithLayer(WithStartEnd(WithFill(WithStroke(KicadElement)))) {
	override name = 'gr_line';
}

export class KicadElementGrRect extends WithLayer(WithStartEnd(WithFill(WithStroke(KicadElement)))) {
	override name = 'gr_rect';
}