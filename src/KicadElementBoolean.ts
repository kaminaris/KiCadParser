import { KicadElement } from './KicadElement';

/**
 * (in_bom yes)
 *
 * Some older KiCad versions wrote certain flags (e.g. fields_autoplaced) as a
 * bare presence marker with no value at all - `(fields_autoplaced)` - where
 * the element merely existing means true. We're targeting KiCad 9/10, so
 * rather than preserve that legacy shape, we read it (presence means true)
 * and always write the modern `(name yes)`/`(name no)` form.
 */
export class KicadElementBoolean extends KicadElement {
	value: boolean = false;

	override afterParse() {
		if (this.attributes.length === 0) {
			this.value = true;
			return;
		}

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

/** KiCad 10 schematic / library: `(in_pos_files yes|no)`. */
export class KicadElementInPosFiles extends KicadElementBoolean {
	override name = 'in_pos_files';
}

/** KiCad 10 library: `(duplicate_pin_numbers_are_jumpers yes|no)`. */
export class KicadElementDuplicatePinNumbersAreJumpers extends KicadElementBoolean {
	override name = 'duplicate_pin_numbers_are_jumpers';
}

/** KiCad 10: `(embedded_fonts yes|no)`. */
export class KicadElementEmbeddedFonts extends KicadElementBoolean {
	override name = 'embedded_fonts';
}

/** KiCad 10 property: `(show_name yes|no)`. */
export class KicadElementShowName extends KicadElementBoolean {
	override name = 'show_name';
}

/** KiCad 10 property: `(do_not_autoplace yes|no)`. */
export class KicadElementDoNotAutoplace extends KicadElementBoolean {
	override name = 'do_not_autoplace';
}