import { KicadElementShape } from './KicadElementLiteral';
import { KicadElementAt }    from './KicadElementAt';
import { KicadElement }      from './KicadElement';

export type KicadGlobalLabelShape = 'input' | 'output' | 'bidirectional' | 'tri_state' | 'passive';

export class KicadElementGlobalLabel extends KicadElement {
	override name = 'global_label';

	getName(): string {
		if (this.attributes.length !== 1) {
			console.log(this);
			throw new Error(`${ this.name } expects exactly one attribute, got ${ this.attributes.length }`);
		}

		return this.attributes[0].value as string ?? '';
	}

	getShape(): KicadGlobalLabelShape {
		const shape = this.findFirstChildByClass(KicadElementShape);
		if (shape) {
			return shape.value as KicadGlobalLabelShape;
		}
		return 'input';
	}
}