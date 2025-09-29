import { KicadElement, KicadLayer } from './KicadElement';
import { KicadElementUUID }         from './KicadElementUUID';
import { KicadElementStroke }       from './KicadElementStroke';

export class KicadElementFpPoly extends KicadElement {
	override name = 'fp_poly';

	points: { x: number, y: number }[] = [];
	layer: KicadLayer = 'F.SilkS';
	uuid = new KicadElementUUID();
	stroke = new KicadElementStroke();
	fill = false;

	addPoint(x: number, y: number) {
		this.points.push({ x, y });
	}

	writePoints() {
		const coords = this.points.map(c => `(xy ${ c.x } ${ c.y })`).join(' ');
		return `(pts ${ coords })`;
	}

	override write(): string {
		return `
(
    ${ this.name }
    ${ this.writePoints() }
    ${ this.stroke.write() }
    (fill ${ this.fill ? 'solid' : 'none' })
    (layer "${ this.layer }")
    ${ this.uuid.write() }
)
		`;
	}
}