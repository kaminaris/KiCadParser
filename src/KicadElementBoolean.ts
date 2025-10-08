import { KicadElement } from './KicadElement';

/**
 * (in_bom yes)
 */
export class KicadElementBoolean extends KicadElement {
	value: boolean = false;

	override afterParse() {
		if (this.attributes.length !== 1) {
			throw new Error(`${ this.name } expects exactly one attribute, got ${ this.attributes.length }`);
		}

		this.value = this.attributes[0].value === 'yes' || this.attributes[0].value === true;
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${ this.name } ${ this.value ? 'yes' : 'no' })`;
	}
}

export class KicadElementBold extends KicadElementBoolean {
	override name = 'bold';
}

export class KicadElementDnp extends KicadElementBoolean {
	override name = 'dnp';
}

export class KicadElementExcludeFromSim extends KicadElementBoolean {
	override name = 'exclude_from_sim';
}

export class KicadElementFieldsAutoplaced extends KicadElementBoolean {
	override name = 'fields_autoplaced';
}

export class KicadElementHide extends KicadElementBoolean {
	override name = 'hide';
}

export class KicadElementInBom extends KicadElementBoolean {
	override name = 'in_bom';
}

export class KicadElementItalic extends KicadElementBoolean {
	override name = 'italic';
}

export class KicadElementOnBoard extends KicadElementBoolean {
	override name = 'on_board';
}

export class KicadElementUnlocked extends KicadElementBoolean {
	override name = 'unlocked';
}