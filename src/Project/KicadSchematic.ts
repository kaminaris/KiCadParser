import { KicadElementSheet }  from '../KicadElementSheet';
import { KicadElementSymbol } from '../KicadElementSymbol';
import { KicadSExprFile }     from './KicadSExprFile';
import { SymbolBOMInterface } from './SymbolBOMInterface';

export class KicadSchematic extends KicadSExprFile {
	sheets: KicadSchematic[] = [];

	override async loadFromPath(filePath: string): Promise<void> {
		await super.loadFromPath(filePath);
		if (!this.rootElement) {
			throw new Error('Schematic not loaded');
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
		const symbols = this.getAllSymbols(recursive);

		const output: SymbolBOMInterface[] = [];

		for (const sym of symbols) {
			if (!includeDnp && sym.isDnp()) {
				continue;
			}
			const properties = sym.getAllProperties();
			const refProp = properties['Reference'];
			if (
				!refProp ||
				refProp.startsWith('#') ||
				!properties['Value'] ||
				!properties['Footprint']
			) {
				console.log('failed becauuse', !refProp, properties);
				continue;
			}

			const newItem: any = {
				Qty: 1
			};

			// copy all other properties
			for (const key of Object.keys(properties)) {
				newItem[key] = properties[key];
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
}
