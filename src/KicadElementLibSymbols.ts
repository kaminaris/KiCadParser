import { KicadElementSymbol } from './KicadElementSymbol';
import { KicadElement }       from './KicadElement';

export class KicadElementLibSymbols extends KicadElement {
	findSymbolByName(name: string) {
		return this.findChildrenByClass(KicadElementSymbol).find(s => s.symbolName === name);
	}
}