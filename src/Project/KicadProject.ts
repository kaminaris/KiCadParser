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