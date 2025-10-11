import { KicadElementLayers } from './KicadElementLayers';
import { WithOrigin }         from './Mixins/WithOrigin';
import { KicadElement }       from './KicadElement';
import { WithSize }           from './Mixins/WithSize';

export type KicadPadShape = 'oval' | 'rect' | 'trapezoid' | 'circle' | 'roundrect';
export const KicadPadShapes: KicadPadShape[] = ['oval', 'rect', 'trapezoid', 'circle', 'roundrect'];

/**
 * 	(pad "1" thru_hole circle
 * 		(at 0 0)
 * 		(size 1.778 1.778)
 * 		(drill 1.143)
 * 		(layers "*.Cu" "*.Mask")
 * 		(remove_unused_layers no)
 * 		(uuid "ada9ba87-9a30-451a-9527-e65964eac081")
 * 	)
 */
export class KicadElementPad extends WithSize(WithOrigin(KicadElement)) {
	override name = 'pad';

	padNumber = '1';
	padType: 'thru_hole' | 'smd' = 'thru_hole'; // TODO: not complete
	shape: KicadPadShape = 'rect';

	drillX?: number;
	drillY?: number;

	constructor(padNumber?: string, originX?: number, originY?: number, width?: number, height?: number) {
		super();
		if (padNumber) {
			this.padNumber = padNumber;
		}
		if (originX !== undefined && originY !== undefined) {
			this.setOrigin(originX, originY);
		}
		if (width !== undefined && height !== undefined) {
			this.setSize(width, height);
		}
	}

	/**
	 * Layers can be a mask
	 */
	getLayers(globalLayers: string[]): string[] {
		const layersChild = this.findFirstChildByClass(KicadElementLayers);
		let result: string[] = [];
		if (!layersChild) {
			// default layers
			result = this.isSmd() ? ['F.Cu', 'F.Paste', 'F.Mask'] : ['*.Cu', '*.Mask'];
		}
		else {
			result = layersChild.attributes.map(l => l.value as string);
		}
		const out = [];
		for (const layer of result) {
			if (layer.indexOf('*') >= 0) {
				const regex = new RegExp('^' + layer.replace(/\*/g, '.*') + '$');
				out.push(...globalLayers.filter(l => regex.test(l)));
			}
			else {
				out.push(layer);
			}
		}
		return out;
	}

	setDrillSize(x: number, y: number) {
		this.drillX = x;
		this.drillY = y;
	}

	setType(type: string) {
		this.padType = type as any;
	}

	isSmd() {
		return this.padType === 'smd';
	}

	override afterParse() {
		if (this.attributes.length < 3) {
			throw new Error(`${ this.name } expects at least three attributes, got ${ this.attributes.length }`);
		}

		this.padNumber = this.attributes[0].value as string;
		this.padType = this.attributes[1].value as any;
		if (!KicadPadShapes.includes(this.attributes[2].value as KicadPadShape)) {
			throw new Error(`Invalid pad shape: ${ this.attributes[2].value }`);
		}
		this.shape = this.attributes[2].value as KicadPadShape;
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${ this.name } "${ this.padNumber }" ${ this.padType } ${ this.shape }\n` +
			`${ this.writeChildren() }\n${ this.pad() })`;
	}

	//
	// 	override write(): string {
	// 		// TODO: oversimplification
	// 		const layers = this.isSmd ? '(layers "F.Cu" "F.Paste" "F.Mask")' : '(layers "*.Cu" "*.Mask")';
	//
	// 		return `
	// (
	//     pad
	//     "${ this.padNumber }"
	//     ${ this.isSmd ? 'smd' : 'thru_hole' }
	//     ${ this.shape }
	//     ${ this.origin.write() }
	//     ${ this.size.write() }
	//     ${ layers }
	//     ${ this.writeDrill() }
	//     (roundrect_rratio 0.25)
	//     ${ this.isSmd ? '' : '(remove_unused_layers no)' }
	//     ${ this.uuid.write() }
	// )
	// 		`;
	// 	}
}