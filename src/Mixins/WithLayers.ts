import { KicadElementLayers } from '../KicadElementLayers';
import { Ctor }               from './Ctor';
import { KicadElement }       from '../KicadElement';

export function WithLayers<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		getLayers(): string[] {
			const layer = this.findFirstChildByClass(KicadElementLayers);
			if (layer) {
				return layer.attributes.map(attr => attr.value as string);
			}
			return [];
		}

		addLayer(name: string) {
			const layer = this.findOrCreateChildByClass(KicadElementLayers);
			if (!layer.attributes.find(attr => attr.value === name)) {
				layer.attributes.push({ format: 'quoted', value: name });
			}
		}

		removeLayer(name: string) {
			const layer = this.findFirstChildByClass(KicadElementLayers);
			if (layer) {
				const index = layer.attributes.findIndex(attr => attr.value === name);
				if (index !== -1) {
					layer.attributes.splice(index, 1);
				}
			}
		}
	};
}