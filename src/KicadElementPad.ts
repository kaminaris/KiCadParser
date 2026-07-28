import { WithDrill }          from './Mixins/WithDrill';
import { KicadElementLayers } from './KicadElementLayers';
import { WithOrigin }         from './Mixins/WithOrigin';
import { KicadElement }       from './KicadElement';
import { WithSize }           from './Mixins/WithSize';
import { WithUUID }           from './Mixins/WithUUID';
import { KicadElementPts }    from './KicadElementPts';
import { KicadElementXY }     from './KicadElementXY';
import { KicadElementGrPoly } from './KicadElementPolygon';

export type KicadPadShape = 'oval' | 'rect' | 'trapezoid' | 'circle' | 'roundrect' | 'custom';
export const KicadPadShapes: KicadPadShape[] = ['oval', 'rect', 'trapezoid', 'circle', 'roundrect', 'custom'];

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
export class KicadElementPad extends WithUUID(WithDrill(WithSize(WithOrigin(KicadElement)))) {
	override name = 'pad';

	padNumber = '1';
	padType: 'thru_hole' | 'smd' | 'np_thru_hole' = 'thru_hole'; // TODO: not complete
	shape: KicadPadShape = 'rect';

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
	 * Emit a KiCad custom pad polygon (points relative to pad origin).
	 *
	 * KiCad copper = **anchor (`size`) ∪ primitives**. Our preview draws only the
	 * polygon, so a large EasyEDA `c_width`/`c_height` rect/circle as the anchor
	 * looks fine here but becomes a "hammer" / fat rectangle in pcbnew.
	 *
	 * Keep the anchor as a tiny circle at the pad origin so the copper shape is
	 * effectively the `gr_poly`. Clearance still follows the outline
	 * (`clearance outline`).
	 *
	 * 	(size 0.01 0.01)
	 * 	(options (clearance outline) (anchor circle))
	 * 	(primitives
	 * 		(gr_poly (pts (xy …) …) (width 0) (fill yes))
	 * 	)
	 */
	setCustomPolygon(points: Array<{ x: number; y: number }>, anchor: 'rect' | 'circle' = 'circle') {
		this.shape = 'custom';
		// Tiny thermal/clearance anchor — must stay > 0 for KiCad.
		this.setSize(0.01, 0.01);

		const options = this.findOrCreateChildByName('options');
		options.clearChildren();
		options.setSimpleChild('clearance', 'outline', 'literal');
		options.setSimpleChild('anchor', anchor, 'literal');

		const primitives = this.findOrCreateChildByName('primitives');
		primitives.clearChildren();

		// Pad-primitive gr_poly uses (width 0) (fill yes), not stroke/layer.
		const grPoly = new KicadElement();
		grPoly.name = 'gr_poly';
		const pts = new KicadElementPts();
		for (const p of points) {
			pts.addChild(new KicadElementXY(p.x, p.y));
		}
		grPoly.addChild(pts);
		grPoly.setSimpleChild('width', 0, 'numeric');
		const fill = new KicadElement();
		fill.name = 'fill';
		fill.setAttribute({ value: 'yes', format: 'literal' });
		grPoly.addChild(fill);
		primitives.addChild(grPoly);
	}

	/** Polygon rings from `(primitives (gr_poly …))`, pad-local coordinates. */
	getCustomPolygonPoints(): Array<Array<{ x: number; y: number }>> {
		const primitives = this.findFirstChildByName('primitives');
		if (!primitives) {
			return [];
		}
		const rings: Array<Array<{ x: number; y: number }>> = [];
		for (const child of primitives.children) {
			if (child.name !== 'gr_poly') {
				continue;
			}
			let points: Array<{ x: number; y: number }> = [];
			if (typeof (child as KicadElementGrPoly).getPoints === 'function') {
				points = (child as KicadElementGrPoly).getPoints();
			}
			else {
				const pts = child.findFirstChildByClass(KicadElementPts)
					?? child.findFirstChildByName('pts');
				if (pts) {
					points = pts.children
						.filter((c): c is KicadElementXY => c instanceof KicadElementXY || c.name === 'xy')
						.map(c => ({
							x: (c as KicadElementXY).x,
							y: (c as KicadElementXY).y
						}));
				}
			}
			if (points.length >= 3) {
				rings.push(points);
			}
		}
		return rings;
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