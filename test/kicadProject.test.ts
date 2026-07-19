import { readFile } from 'fs/promises';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { KicadProject } from '../src/Project/KicadProject';
import type { PathUtils } from '../src/Project/PathUtils';

const fixturesDir = path.join(__dirname, 'fixtures', 'gigaesc');

const nodePathUtils: PathUtils = {
	dirname: (p) => path.dirname(p),
	resolve: (...p) => path.resolve(...p),
	join: (...p) => path.join(...p),
	basename: (p, ext) => path.basename(p, ext),
	extname: (p) => path.extname(p),
	isAbsolute: (p) => path.isAbsolute(p)
};

const loadFile = (filePath: string) => readFile(filePath, 'utf-8');

describe('KicadProject.loadFromPath', () => {
	it('loads the main schematic and recurses into hierarchical sheets', async () => {
		const project = new KicadProject();

		await project.loadFromPath(
			loadFile,
			nodePathUtils,
			path.join(fixturesDir, 'DevKitX2-Castellated6L.kicad_sch')
		);

		expect(project.mainSchematic).toBeDefined();
		expect(project.mainSchematic!.loaded).toBe(true);

		// The top-level schematic references these sub-sheets (ESP32.kicad_sch exists
		// in the project but isn't wired into this particular top sheet's hierarchy).
		const sheetNames = project.mainSchematic!.sheets.map(s => s.name).sort();
		expect(sheetNames).toEqual(
			['CAN', 'Connectors', 'Filters', 'IMU', 'MCU', 'Power'].sort()
		);

		for (const sheet of project.mainSchematic!.sheets) {
			expect(sheet.loaded).toBe(true);
		}
	});

	it('collects symbols recursively across all hierarchical sheets', async () => {
		const project = new KicadProject();

		await project.loadFromPath(
			loadFile,
			nodePathUtils,
			path.join(fixturesDir, 'DevKitX2-Castellated6L.kicad_sch')
		);

		const topLevelSymbols = project.mainSchematic!.getAllSymbols(false);
		const allSymbols = project.mainSchematic!.getAllSymbols(true);

		expect(allSymbols.length).toBeGreaterThan(topLevelSymbols.length);
	});

	it('builds a BOM from the schematic hierarchy', async () => {
		const project = new KicadProject();

		await project.loadFromPath(
			loadFile,
			nodePathUtils,
			path.join(fixturesDir, 'DevKitX2-Castellated6L.kicad_sch')
		);

		const bom = project.mainSchematic!.getBOM(true);

		expect(bom.length).toBeGreaterThan(0);
		for (const entry of bom) {
			expect(entry.Reference).toBeTruthy();
			expect(entry.Qty).toBeGreaterThan(0);
		}
	});

	it('loads the board and reports its copper/silk/etc layers', async () => {
		const project = new KicadProject();

		await project.loadFromPath(
			loadFile,
			nodePathUtils,
			undefined,
			path.join(fixturesDir, 'DevKitX2-Castellated6L.kicad_pcb')
		);

		expect(project.mainBoard).toBeDefined();
		expect(project.mainBoard!.loaded).toBe(true);

		const layers = project.mainBoard!.getAllLayers();
		expect(layers).toContain('F.Cu');
		expect(layers).toContain('B.Cu');
	});

	it('builds a BOM from the board, including KiCad 10 jumper footprints', async () => {
		const project = new KicadProject();

		await project.loadFromPath(
			loadFile,
			nodePathUtils,
			undefined,
			path.join(fixturesDir, 'DevKitX2-Castellated6L.kicad_pcb')
		);

		const bom = project.mainBoard!.getBOM();
		expect(bom.length).toBeGreaterThan(0);
	});
});
