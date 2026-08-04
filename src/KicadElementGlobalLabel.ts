import { WithOrigin }        from './Mixins/WithOrigin';
import { WithEffects }       from './Mixins/WithEffects';
import { WithJustify }       from './Mixins/WithJustify';
import { WithUUID }          from './Mixins/WithUUID';
import { KicadElementShape } from './KicadElementLiteral';
import { KicadElement }      from './KicadElement';

export type KicadGlobalLabelShape = 'input' | 'output' | 'bidirectional' | 'tri_state' | 'passive';

export class KicadElementGlobalLabel extends WithUUID(WithOrigin(WithEffects(WithJustify(KicadElement)))) {
	override name = 'global_label';

	getName(): string {
		if (this.attributes.length !== 1) {
			console.log(this);
			throw new Error(`${ this.name } expects exactly one attribute, got ${ this.attributes.length }`);
		}

		return this.attributes[0].value as string ?? '';
	}

	setName(name: string): void {
		if (this.attributes.length === 0) {
			this.attributes.push({ format: 'quoted', value: name });
		}
		else {
			this.attributes[0].value = name;
			this.attributes[0].format = 'quoted';
		}
	}

	getShape(): KicadGlobalLabelShape {
		const shape = this.findFirstChildByClass(KicadElementShape);
		if (shape) {
			return shape.value as KicadGlobalLabelShape;
		}
		return 'input';
	}

	setShape(shape: KicadGlobalLabelShape): void {
		this.findOrCreateChildByClass(KicadElementShape).value = shape;
	}
}