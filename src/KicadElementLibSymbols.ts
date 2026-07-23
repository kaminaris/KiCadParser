import { KicadElementSymbol } from './KicadElementSymbol';
import { KicadElement }       from './KicadElement';

export class KicadElementLibSymbols extends KicadElement {
	override name = 'lib_symbols';

	findSymbolByName(name: string) {
		return this.findChildrenByClass(KicadElementSymbol).find(s => s.symbolName === name);
	}
}