import { KicadElementStroke, KicadStrokeType } from 'src/app/Lib/Kicad/src/KicadElementStroke';
import { KicadElementType }                    from 'src/app/Lib/Kicad/src/KicadElementType';
import { KicadElementWidth }                   from 'src/app/Lib/Kicad/src/KicadElementWidth';
import { KicadElementPts }                     from './KicadElementPts';
import { KicadElementXY }                      from './KicadElementXY';
import { KicadElement }                        from './KicadElement';

export class KicadElementPolyline extends KicadElement {
	override name = 'polyline';

	getPoints(): Array<{ x: number, y: number }> {
		const pts = this.findFirstChildByClass(KicadElementPts);
		if (!pts) {
			return [];
		}
		const type = pts.findChildrenByClass(KicadElementXY);
		return type.map(p => ({ x: p.x, y: p.y }));
	}

	getStroke(): { width: number, type: KicadStrokeType } {
		const stroke = this.findFirstChildByClass(KicadElementStroke);
		if (!stroke) {
			return { width: 0.1, type: 'solid' }; // Default stroke
		}

		return { width: stroke.getWidth(), type: stroke.getType() }; // Example color for dashed
	}
}