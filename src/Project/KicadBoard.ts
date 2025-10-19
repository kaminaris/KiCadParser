import { KicadElementFootprint } from 'src/app/Lib/Kicad/src/KicadElementFootprint';
import { SymbolBOMInterface }    from 'src/app/Lib/Kicad/src/Project/SymbolBOMInterface';
import { KicadElementLayers }    from '../KicadElementLayers';
import { KicadSExprFile }        from './KicadSExprFile';

export class KicadBoard extends KicadSExprFile {
	getAllLayers() {
		const out: string[] = [];
		if (!this.rootElement) {
			return out;
		}

		const layers = this.rootElement.findFirstChildByClass(KicadElementLayers);
		if (!layers) {
			return out;
		}

		for (const layerAttr of layers.layers) {
			out.push(layerAttr.name);
		}
		return out;
	}

	getBOM(recursive?: boolean, includeDnp = false): SymbolBOMInterface[] {
		const out: SymbolBOMInterface[] = [];
		if (!this.rootElement) {
			return out;
		}

		const footprints = this.rootElement.findChildrenByClass(KicadElementFootprint);
		for (const fp of footprints) {
			const properties = fp.getAllProperties();
			const layer = fp.getLayer();

			const isDnp = fp.isDnp();
			if (isDnp && !includeDnp) {
				continue;
			}

			const refProp = properties['Reference'];
			const valueProp = properties['Value'];
			const footprintProp = fp.getFootprintName();

			if (
				!refProp ||
				refProp.startsWith('#') ||
				!valueProp ||
				!footprintProp
			) {
				console.log('Skipping footprint for BOM, missing required properties:', properties);
				continue;
			}

			const bomEntry: SymbolBOMInterface = {
				Reference: refProp,
				Value: valueProp,
				Footprint: footprintProp,
				MPN: properties['MPN'] || '',
				Qty: 1,
				layer: layer,
			};

			// Add all other properties as fields
			for (const prop in properties) {
				bomEntry[prop] = properties[prop];
			}

			out.push(bomEntry);
		}

		return out;
	}
}