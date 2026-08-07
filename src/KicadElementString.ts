import { KicadElement } from './KicadElement';

export class KicadElementString extends KicadElement {
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
		return this.pad() + `(${ this.name } "${ this.value }")`;
	}
}

export class KicadElementTitle extends KicadElementString {
	override name = 'title';
}

export class KicadElementDate extends KicadElementString {
	override name = 'date';
}

export class KicadElementRev extends KicadElementString {
	override name = 'rev';
}

export class KicadElementCompany extends KicadElementString {
	override name = 'company';
}

export class KicadElementFace extends KicadElementString {
	override name = 'face';
}

export class KicadElementGenerator extends KicadElementString {
	override name = 'generator';
}

export class KicadElementGeneratorVersion extends KicadElementString {
	override name = 'generator_version';
}

export class KicadElementLibId extends KicadElementString {
	override name = 'lib_id';
}

/** `(symbol "Derived" (extends "Base") ...)` — a derived library symbol.
 * Confirmed in the user's local KiCad checkout (sch_io_kicad_sexpr_parser.cpp's
 * T_extends case -> LIB_SYMBOL::SetParentName): a derived symbol stores only
 * this back-reference plus whatever properties it overrides — no graphics/
 * pins of its own — real KiCad resolves LIB_SYMBOL::GetParent() transparently
 * everywhere (drawing, pin lists, field defaults) rather than duplicating the
 * base symbol's data into every derivative. */
export class KicadElementExtends extends KicadElementString {
	override name = 'extends';
}

export class KicadElementReference extends KicadElementString {
	override name = 'reference';
}

export class KicadElementNetName extends KicadElementString {
	override name = 'net_name';
}

export class KicadElementPinType extends KicadElementString {
	override name = 'pintype';
}

export class KicadElementPinFunction extends KicadElementString {
	override name = 'pinfunction';
}

export class KicadElementNetTiePadGroups extends KicadElementString {
	override name = 'net_tie_pad_groups';
}