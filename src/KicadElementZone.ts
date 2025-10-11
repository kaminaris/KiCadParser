import { KicadElementLayer }                              from './KicadElementLayer';
import { KicadElementLayers }                             from './KicadElementLayers';
import { KicadElementFilledPolygon, KicadElementPolygon } from './KicadElementPolygon';
import { KicadElementNetName }                            from './KicadElementString';
import { WithLayerColor }                                 from './Mixins/WithLayerColor';
import { KicadElement }                                   from './KicadElement';

/**
 * (zone
 * 		(net 0)
 * 		(net_name "")
 * 		(layers "F.Cu" "B.Cu" "In1.Cu" "In2.Cu")
 * 		(uuid "8506632e-257d-44ce-97ec-38de75a9371a")
 * 		(hatch edge 0.5)
 * 		(connect_pads
 * 			(clearance 0)
 * 		)
 * 		(min_thickness 0.25)
 * 		(filled_areas_thickness no)
 * 		(keepout
 * 			(tracks not_allowed)
 * 			(vias not_allowed)
 * 			(pads not_allowed)
 * 			(copperpour allowed)
 * 			(footprints allowed)
 * 		)
 * 		(placement
 * 			(enabled no)
 * 			(sheetname "")
 * 		)
 * 		(fill (thermal_gap 0.5) (thermal_bridge_width 0.5))
 * 		(polygon
 * 			(pts
 * 				(xy -0.03 -3.59) (xy 4.95 -3.59) (xy 4.985 -3.555) (xy 4.985 -0.165) (xy 0 0) (xy -0.03 -0.03)
 * 			)
 * 		)
 * 	)
 */
export class KicadElementZone extends WithLayerColor(KicadElement) {
	value: string = 'polygon';

	isKeepOut() {
		const netName = this.findFirstChildByClass(KicadElementNetName);
		return !netName || netName.value === '';
	}

	// Zone polygon is just outline, no fill, no stroke
	getPolygon(): { x: number; y: number }[] {
		const polygon = this.findFirstChildByClass(KicadElementPolygon);
		return polygon ? polygon.getPoints() : [];
	}

	getLayers(): string[] {
		const layers = this.findFirstChildByClass(KicadElementLayers);
		let layerNames = layers?.attributes.map(a => a.value as string) || [];
		if (layerNames.length === 0) {
			const layer = this.findFirstChildByClass(KicadElementLayer);
			if (layer) {
				layerNames = [layer.getLayerName()];
			}
		}
		return layerNames;
	}

	getFilledPolygons(): { layer: string, points: { x: number; y: number }[] }[] {
		const filledPolygons: { layer: string, points: { x: number; y: number }[] }[] = [];
		const children = this.findChildrenByClass(KicadElementFilledPolygon);
		for (const child of children) {
			const l = child.getLayer();
			filledPolygons.push({
				layer: l,
				points: child.getPoints()
			});
		}
		return filledPolygons;
	}
}