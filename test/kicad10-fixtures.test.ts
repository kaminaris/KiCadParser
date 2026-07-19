import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';

const fixturesDir = path.join(__dirname, 'fixtures', 'gigaesc');

const schematicFiles = [
	'CAN.kicad_sch',
	'Connectors.kicad_sch',
	'DevKitX2-Castellated6L.kicad_sch',
	'ESP32.kicad_sch',
	'Filters.kicad_sch',
	'IMU.kicad_sch',
	'MCU.kicad_sch',
	'Power.kicad_sch'
];

function normalize(s: string): string {
	return s.replace(/\s+/g, ' ').trim();
}

describe('KiCad 10 real-world fixtures (GigaESC-ComputeModule)', () => {
	it.each(schematicFiles)('parses %s and round-trips it byte-for-byte (modulo whitespace)', (file) => {
		const data = readFileSync(path.join(fixturesDir, file), 'utf-8');
		const parser = new KicadParser();
		const root = parser.parse(data);

		expect(root.name).toBe('kicad_sch');
		expect(normalize(root.write())).toBe(normalize(data));
	});

	it('parses the KiCad 10 symbol library', () => {
		const data = readFileSync(path.join(fixturesDir, 'X3.0CH-Library.kicad_sym'), 'utf-8');
		const parser = new KicadParser();
		const root = parser.parse(data);

		expect(root.name).toBe('kicad_symbol_lib');
		expect(normalize(root.write())).toBe(normalize(data));
	});

	it('parses a KiCad 10 board, including the new (units (unit ...)) jumper footprint block', () => {
		const data = readFileSync(path.join(fixturesDir, 'DevKitX2-Castellated6L.kicad_pcb'), 'utf-8');
		const parser = new KicadParser();

		const root = parser.parse(data);

		expect(root.name).toBe('kicad_pcb');

		// The board contains jumper footprints using the KiCad 10
		// (units (unit (name "A") (pins "1" "2"))) shape, distinct from both the
		// numeric (unit N) symbol-instance element and the unrelated numeric
		// (units 3) dimension-format element used elsewhere in the same file.
		const jumperUnitsBlocks = root.findAllChildrenByName('units')
			.filter(units => units.findFirstChildByName('unit'));
		expect(jumperUnitsBlocks.length).toBeGreaterThan(0);
		for (const units of jumperUnitsBlocks) {
			const unit = units.findFirstChildByName('unit')!;
			expect(unit.findFirstChildByName('name')).toBeDefined();
			expect(unit.findFirstChildByName('pins')).toBeDefined();
		}
	});
});
