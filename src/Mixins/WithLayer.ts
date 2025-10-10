import { Ctor }              from './Ctor';
import { KicadElementLayer } from '../KicadElementLayer';
import { KicadElement }      from '../KicadElement';

export function WithLayer<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		getLayer() {
			const layer = this.findFirstChildByClass(KicadElementLayer);
			if (layer) {
				return layer.getLayerName();
			}
			return '';
		}

		setLayer(name: string) {
			const layer = this.findOrCreateChildByClass(KicadElementLayer);
			layer.name = name;
		}
	};
}