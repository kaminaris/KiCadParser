import { KicadElement, KicadLayer } from './KicadElement';
import { KicadElementUUID }         from './KicadElementUUID';
import { KicadElementStroke }       from './KicadElementStroke';

export class KicadElementFpLine extends KicadElement {
	override name = 'fp_line';

	startX: number;
	startY: number;
	endX: number;
	endY: number;
	layer: KicadLayer = 'F.SilkS';
	uuid = new KicadElementUUID();
	stroke = new KicadElementStroke();

	constructor(startX: number, startY: number, endX: number, endY: number) {
		super();
		this.startX = startX;
		this.startY = startY;
		this.endX = endX;
		this.endY = endY;
	}

	override write(): string {
		return `
(
    ${this.name}
    (start ${ this.startX } ${ this.startY })
    (end ${ this.endX } ${ this.endY })
    ${ this.stroke.write() }
    (layer "${ this.layer }")
    ${ this.uuid.write() }
)
		`;
	}
}