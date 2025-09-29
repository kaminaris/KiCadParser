import { KicadElementType } from './KicadElementType';
import { KicadElement }     from './KicadElement';

export class KicadElementFill extends KicadElement {
	override name = 'fill';

	// TODO: implement fill types
	setType(value: string) {
		const t = this.findOrCreateChildByClass(KicadElementType);
		t.setAttribute({ value, format: 'literal' }, 0);
	}
}