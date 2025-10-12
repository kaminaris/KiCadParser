import { Ctor }              from './Ctor';
import { KicadElementDrill } from '../KicadElementDrill';
import { KicadElement }      from '../KicadElement';

export function WithDrill<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setDrill(diameterOrWidth?: number, height?: number) {
			if (diameterOrWidth === undefined) {
				return;
			}
			const existing = this.findOrCreateChildByClass(KicadElementDrill);
			existing.width = diameterOrWidth;
			if (height !== undefined) {
				existing.height = height;
			}
		}

		getDrill(): { width: number; height?: number } {
			const drill = this.findFirstChildByClass(KicadElementDrill);
			return { width: drill?.width ?? 0, height: drill?.height };
		}
	};
}