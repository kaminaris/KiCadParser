import { SymbolBOMInterface } from 'src/app/Lib/Kicad/src/Project/SymbolBOMInterface';
import { KicadElement }       from '../KicadElement';
import { KicadParser }        from '../KicadParser';
import { PathUtils }          from './PathUtils';

export abstract class KicadSExprFile {
	name = 'Unnamed';

	path = '';
	dirname = '';
	data = '';

	loaded = false;

	rootElement?: KicadElement;
	loadFile?: (path: string) => Promise<string>;
	pathUtils?: PathUtils;

	async loadFromPath(filePath: string) {
		if (!this.loadFile) {
			throw new Error('loadFile function not provided');
		}

		this.path = filePath;
		this.dirname = this.pathUtils?.dirname(this.path)!;

		const data = await this.loadFile(filePath);
		if (!data) {
			throw new Error(`Failed to load schematic from path: ${ filePath }`);
		}

		this.data = data;
		this.loaded = true;

		const parser = new KicadParser();
		this.rootElement = parser.parse(data);

		if (!this.rootElement) {
			throw new Error('Failed to parse schematic data');
		}
	}

	groupBOM(bom: SymbolBOMInterface[]): SymbolBOMInterface[] {
		// let found = output.find(
		// 	i => i.Value === properties['Value'] && i.Footprint === properties['Footprint']
		// );
		// if (found) {
		// 	found.Reference += `, ${ item['Reference'] }`;
		// 	found.Qty++;
		// 	// Condense other properties if they are different
		// 	// TODO: this needs a bit more work
		// 	for (const key of Object.keys(item)) {
		// 		if (key === 'Reference' || key === 'Qty') {
		// 			continue;
		// 		}
		// 		if ((found as any)[key] !== item[key]) {
		// 			(found as any)[key] =
		// 				(found as any)[key]
		// 				? `${ (found as any)[key] }, ${ item[key] }`
		// 				: item[key];
		// 		}
		// 	}
		// 	continue;
		// }
		const grouped: { [key: string]: SymbolBOMInterface } = {};

		for (const item of bom) {
			const key = `${ item.Value }|${ item.Footprint }|${ item.MPN }|${ item.layer }`;
			if (grouped[key]) {
				grouped[key].Qty += item.Qty;
				grouped[key].Reference += `, ${ item.Reference }`;
			}
			else {
				grouped[key] = { ...item };
			}
		}

		return Object.values(grouped);
	}
}
