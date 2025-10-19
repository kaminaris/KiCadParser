export interface SymbolBOMInterface {
	Reference: string;
	Value: string;
	Footprint: string;
	MPN: string;
	Qty: number;
	layer: string;

	[key: string]: any;
}