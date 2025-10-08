import { KicadElement }       from './KicadElement';
import { KicadElementOrigin } from './KicadElementOrigin';
import { KicadElementUUID }   from './KicadElementUUID';
import { KicadElementSize }   from './KicadElementSize';

export type KicadPadShape = 'oval' | 'rect' | 'trapezoid' | 'circle' | 'roundrect';
export const KicadPadShapes: KicadPadShape[] = ['oval', 'rect', 'trapezoid', 'circle', 'roundrect'];

export class KicadElementPad extends KicadElement {
	padNumber = '';
	shape: KicadPadShape = 'rect';
	isSmd = true;
	origin: KicadElementOrigin;
	size: KicadElementSize;
	uuid = new KicadElementUUID();
	drillX?: number;
	drillY?: number;

	constructor(padNumber: string, originX: number, originY: number, width: number, height: number) {
		super();
		this.padNumber = padNumber;
		this.origin = new KicadElementOrigin(originX, originY);
		this.size = new KicadElementSize(width, height);
	}

	setDrillSize(x: number, y: number) {
		this.drillX = x;
		this.drillY = y;
	}

	writeDrill() {
		if (!this.drillX || !this.drillY || this.isSmd) {
			return '';
		}

		return this.drillX === this.drillY ? `(drill ${ this.drillX })` :
			   `(drill oval ${ this.drillX } ${ this.drillY })`;
	}

	override write(): string {
		// TODO: oversimplification
		const layers = this.isSmd ? '(layers "F.Cu" "F.Paste" "F.Mask")' : '(layers "*.Cu" "*.Mask")';

		return `
(
    pad
    "${ this.padNumber }"
    ${ this.isSmd ? 'smd' : 'thru_hole' }
    ${ this.shape }
    ${ this.origin.write() }
    ${ this.size.write() }
    ${ layers }
    ${ this.writeDrill() }
    (roundrect_rratio 0.25)
    ${ this.isSmd ? '' : '(remove_unused_layers no)' }
    ${ this.uuid.write() }
)
		`;
	}
}