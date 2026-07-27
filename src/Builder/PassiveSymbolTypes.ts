import type { KicadElementSymbol } from '../KicadElementSymbol';

export type PassiveSymbolOpts = {
	reference?: string;
	value?: string;
	footprint?: string;
	datasheet?: string;
};

export type PassiveBuilder = (opts?: PassiveSymbolOpts) => KicadElementSymbol;
