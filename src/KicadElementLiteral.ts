import { KicadElement } from './KicadElement';

export abstract class KicadElementLiteral extends KicadElement {
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
		return this.pad() + `(${ this.name } ${ this.value })`;
	}
}

export class KicadElementShape extends KicadElementLiteral {
	override name = 'shape';
}

/** `(mirror x)` / `(mirror y)` on a placed symbol instance — confirmed bare
 *  (unquoted) token in real files, e.g. shared/kicad-io/test/fixtures/
 *  gigaesc/Connectors.kicad_sch. Previously unregistered (fell back to a
 *  generic KicadElement, read defensively in SchematicPainter.readMirror);
 *  registering it properly is what makes a setter (KicadElementSymbol.
 *  setMirror) possible without hand-rolling attribute manipulation. */
export class KicadElementMirror extends KicadElementLiteral {
	override name = 'mirror';
}