import { WithLayerColor } from './Mixins/WithLayerColor';
import { WithOrigin }     from './Mixins/WithOrigin';
import { WithEffects }    from './Mixins/WithEffects';
import { WithJustify }    from './Mixins/WithJustify';
import { WithLayer }      from './Mixins/WithLayer';
import { KicadElement }   from './KicadElement';

export class KicadElementTextBase extends WithOrigin(WithEffects(WithJustify(KicadElement))) {
	value: string = '';

	constructor(v?: string) {
		super();
		if (v !== undefined) {
			this.value = v;
		}
	}

	override afterParse() {
		if (this.attributes.length !== 1) {
			console.log(this);
			throw new Error(`${ this.name } expects exactly one attribute, got ${ this.attributes.length }`);
		}

		this.value = this.attributes[0].value as string;
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${ this.name } "${ this.value }"\n${ this.writeChildren() }\n${ this.pad() })`;
	}
}

export class KicadElementText extends KicadElementTextBase {
	override name = 'text';
}

export class KicadElementGrText extends WithLayer(WithLayerColor(KicadElementTextBase)) {
	override name = 'gr_text';
}

export class KicadElementFpText extends WithLayer(WithLayerColor(KicadElementTextBase)) {
	override name = 'fp_text';
	type?: string;

	override afterParse() {
		if (this.attributes.length < 2) {
			console.log(this);
			throw new Error(`${ this.name } expects 1-2 attributes, got ${ this.attributes.length }`);
		}

		this.type = this.attributes[0].value as string;

		if (this.attributes.length === 2) {
			this.value = this.attributes[1].value as string;
		}
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${ this.name } ${this.type} "${ this.value }"\n${ this.writeChildren() }\n${ this.pad() })`;
	}
}