import { KicadElementGenerator }        from './KicadElementGenerator';
import { KicadElementGeneratorVersion } from './KicadElementGeneratorVersion';
import { KicadElementVersion }          from './KicadElementVersion';
import { KicadElement }                 from './KicadElement';

export class KicadElementSymbolLib extends KicadElement {
	override name = 'kicad_symbol_lib';

	addBaselineProperties(): void {
		this.addChild(new KicadElementVersion(20241209));
		this.addChild(new KicadElementGenerator('kicad_symbol_editor'));
		this.addChild(new KicadElementGeneratorVersion('9.0'));
	}
}