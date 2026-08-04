import { WithOrigin }        from './Mixins/WithOrigin';
import { WithEffects }       from './Mixins/WithEffects';
import { WithJustify }       from './Mixins/WithJustify';
import { WithUUID }          from './Mixins/WithUUID';
import { KicadElementShape } from './KicadElementLiteral';
import { KicadElement }      from './KicadElement';

export type KicadHierarchicalLabelShape = 'input' | 'output' | 'bidirectional' | 'tri_state' | 'passive';

/**
 * (hierarchical_label "hierarchical"
 * 		(shape input)
 * 		(at 66.04 26.67 180)
 * 		(effects (font (size 1.27 1.27)) (justify right))
 * 		(uuid "5d782e96-4798-4703-8ddb-594af9bbf673")
 * )
 */
export class KicadElementHierarchicalLabel extends WithUUID(WithOrigin(WithEffects(WithJustify(KicadElement)))) {
	override name = 'hierarchical_label';

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

	getShape(): KicadHierarchicalLabelShape {
		const shape = this.findFirstChildByClass(KicadElementShape);
		if (shape) {
			return shape.value as KicadHierarchicalLabelShape;
		}
		return 'input';
	}

	setShape(shape: KicadHierarchicalLabelShape): void {
		this.findOrCreateChildByClass(KicadElementShape).value = shape;
	}
}
