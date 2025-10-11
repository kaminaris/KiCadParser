import { Ctor }               from './Ctor';
import { KicadElementLayers } from '../KicadElementLayers';
import { KicadElementLayer }  from '../KicadElementLayer';
import { KicadElement }       from '../KicadElement';

export function WithLayer<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		getLayer() {
			const layer = this.findFirstChildByClass(KicadElementLayer);
			if (layer) {
				return layer.getLayerName();
			}
			return '';
		}

		getLayerColor(colorScheme: any, layers?: KicadElementLayers, defaultColor = 'rgba(0,0,0,0)'): string {
			if (!layers) {
				return defaultColor;
			}
			const layer = layers.getLayerByName(this.getLayer());
			if (!layer) {
				return defaultColor;
			}

			// replace dots with underscores
			const layerColorAlias = layer.name.toLowerCase().replace(/\./g, '_');
			if (!layerColorAlias) {
				return defaultColor;
			}

			if (layerColorAlias.endsWith('_cu')) {
				// special case for copper layers, remove _cu
				const baseName = layerColorAlias.slice(0, -3);
				const color = (colorScheme.board.copper as any)[baseName];
				if (color) {
					return color;
				}
			}

			let color = (colorScheme.board as any)[layerColorAlias];
			if (!color) {
				color = colorScheme.board.aux_items;
			}

			return color;
		}

		setLayer(name: string) {
			const layer = this.findOrCreateChildByClass(KicadElementLayer);
			layer.name = name;
		}
	};
}