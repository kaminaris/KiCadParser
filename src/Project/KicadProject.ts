import { KicadElementLayers } from '../KicadElementLayers';
import { KicadElementSheet }  from '../KicadElementSheet';
import { KicadElementSymbol } from '../KicadElementSymbol';
import { KicadParser }        from '../KicadParser';
import { KicadElement }       from '../KicadElement';

export interface PathUtils {
	dirname(filePath: string): string;

	resolve(...paths: string[]): string;

	join(...paths: string[]): string;

	basename(filePath: string, ext?: string): string;

	extname(filePath: string): string;

	isAbsolute(filePath: string): boolean;
}

export interface SymbolBOMInterface {
	Reference: string;
	Value: string;
	Footprint: string;
	MPN: string;
	Qty: number;

	[key: string]: any;
}

export class KicadSchematic {
	name = 'Unnamed';

	path = '';
	dirname = '';
	data = '';

	loaded = false;

	rootElement?: KicadElement;
	sheets: KicadSchematic[] = [];
	loadFile?: (path: string) => Promise<string>;
	pathUtils?: PathUtils;

	getAllSymbols(recursive?: boolean): KicadElementSymbol[] {
		if (!this.rootElement) {
			throw new Error('Schematic not loaded');
		}

		const symbols = this.rootElement.findChildrenByClass(KicadElementSymbol);
		if (recursive) {
			for (const sheet of this.sheets) {
				const sheetSymbols = sheet.getAllSymbols(true);
				symbols.push(...sheetSymbols);
			}
		}

		return symbols;
	}

	getBOM(recursive?: boolean, includeDnp = false): SymbolBOMInterface[] {
		const symbols = this.getAllSymbols(recursive).filter((symbol) => {
			if (includeDnp) {
				return true;
			}

			return !symbol.isDnp();
		});

		const props = symbols.map(v => v.getAllProperties());
		// Filter all symbols that do not start with '#'
		const filtered = props.filter(v => {
			const refProp = v['Reference'];
			if (!refProp) {
				return false;
			}
			return !refProp.startsWith('#');
		});

		const output: SymbolBOMInterface[] = [];
		for (const item of filtered) {
			if (!item['Value'] || !item['Footprint']) {
				console.log(`Skipping item with missing Value or Footprint: ${ item['Reference'] }`);
				continue;
			}

			let found = output.find(i => i.Value === item['Value'] && i.Footprint === item['Footprint']);
			if (found) {
				found.Reference += `, ${ item['Reference'] }`;
				found.Qty++;
				// Condense other properties if they are different
				// TODO: this needs a bit more work
				for (const key of Object.keys(item)) {
					if (key === 'Reference' || key === 'Qty') {
						continue;
					}
					if ((found as any)[key] !== item[key]) {
						(found as any)[key] =
							(found as any)[key]
							? `${ (found as any)[key] }, ${ item[key] }`
							: item[key];
					}
				}
				continue;
			}

			const newItem: any = {
				Qty: 1
			};

			// copy all other properties
			for (const key of Object.keys(item)) {
				newItem[key] = item[key];
			}
			if (!newItem.MPN) {
				newItem.MPN = '';
			}

			output.push(newItem);
		}
		// Sort by reference, first R, then C, then L, then U, then alphabetically
		output.sort((a, b) => {
			const refA = a.Reference;
			const refB = b.Reference;

			const prefixA = refA.match(/^[A-Za-z]+/)?.[0] || '';
			const prefixB = refB.match(/^[A-Za-z]+/)?.[0] || '';

			const order = ['R', 'C', 'L', 'D', 'U'];

			const indexA = order.indexOf(prefixA);
			const indexB = order.indexOf(prefixB);

			if (indexA === -1 && indexB === -1) {
				return refA.localeCompare(refB);
			}
			if (indexA === -1) {
				return 1;
			}
			if (indexB === -1) {
				return -1;
			}
			if (indexA !== indexB) {
				return indexA - indexB;
			}

			return refA.localeCompare(refB);
		});

		return output;
	}

	async loadFromPath(schematicPath: string) {
		if (!this.loadFile) {
			throw new Error('loadFile function not provided');
		}

		this.path = schematicPath;
		this.dirname = this.pathUtils?.dirname(this.path)!;

		const data = await this.loadFile(schematicPath);
		if (!data) {
			throw new Error(`Failed to load schematic from path: ${ schematicPath }`);
		}

		this.data = data;
		this.loaded = true;

		const parser = new KicadParser();
		this.rootElement = parser.parse(data);

		if (!this.rootElement) {
			throw new Error('Failed to parse schematic data');
		}

		// Extract hierarchical sheets
		const sheetElements = this.rootElement.findAllChildrenByClass(KicadElementSheet);
		for (const sheetEl of sheetElements) {
			const properties = sheetEl.getProperties();

			const nameProp = properties.find(p => p.propertyName === 'Sheetname');
			if (!nameProp) {
				throw new Error(`Failed to parse schematic name: ${ nameProp }`);
			}

			const sheetName = nameProp.propertyValue;

			const pathProp = properties.find(p => p.propertyName === 'Sheetfile');
			if (!pathProp) {
				throw new Error(`Failed to parse schematic path: ${ pathProp }`);
			}
			const sheetPath = pathProp.propertyValue as string;

			// check if path is absolute, if not, make it relative to the current schematic
			const isAbsolute = this.pathUtils?.isAbsolute(sheetPath);
			const sheetPathResolved = this.pathUtils?.resolve(
				isAbsolute ? sheetPath : this.pathUtils?.join(this.dirname, sheetPath)
			);

			console.log(`Loading sheet: ${ sheetName } from ${ sheetPathResolved }`);
			const sheet = new KicadSchematic();
			sheet.name = sheetName as string;
			sheet.path = sheetPath;
			sheet.loadFile = this.loadFile;
			await sheet.loadFromPath(sheetPathResolved!);
			this.sheets.push(sheet);
		}
	}

	getAllLayers() {
		const out: string[] = [];
		if (!this.rootElement) {
			return out;
		}

		const layers = this.rootElement.findFirstChildByClass(KicadElementLayers);
		if (!layers) {
			return out;
		}

		for (const layerAttr of layers.layers) {
			out.push(layerAttr.name);
		}
		return out;
	}
}

export class KicadProject {
	name = 'Unnamed';

	projectPath = '';
	mainSchematic?: KicadSchematic;

	async loadFromPath(
		schematicPath: string,
		loadFile: (path: string) => Promise<string>,
		pathUtils: PathUtils
	) {
		this.mainSchematic = new KicadSchematic();
		// file name to path
		this.projectPath = pathUtils.dirname(schematicPath);
		this.mainSchematic.loadFile = loadFile;
		this.mainSchematic.pathUtils = pathUtils;

		await this.mainSchematic.loadFromPath(schematicPath);
	}
}