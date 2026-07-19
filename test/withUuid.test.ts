import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';
import { KicadElementFootprint } from '../src/KicadElementFootprint';
import { KicadElementPad } from '../src/KicadElementPad';
import { KicadElementSymbol } from '../src/KicadElementSymbol';
import { KicadElementWire } from '../src/KicadElementWire';
import { KicadElementProperty } from '../src/KicadElementProperty';

const fixturesDir = path.join(__dirname, 'fixtures', 'gigaesc');

function parseFixture(file: string) {
	const data = readFileSync(path.join(fixturesDir, file), 'utf-8');
	return new KicadParser().parse(data);
}

describe('WithUUID mixin', () => {
	it('reads existing uuids off real board/schematic elements', () => {
		const board = parseFixture('DevKitX2-Castellated6L.kicad_pcb');
		const footprint = board.findChildrenByClass(KicadElementFootprint)[0];
		expect(footprint.getUuid()).toMatch(/^[0-9a-f-]{36}$/);

		const pad = footprint.findFirstChildByClass(KicadElementPad)!;
		expect(pad.getUuid()).toMatch(/^[0-9a-f-]{36}$/);

		const schematic = parseFixture('CAN.kicad_sch');
		const wire = schematic.findFirstChildByClass(KicadElementWire)!;
		expect(wire.getUuid()).toMatch(/^[0-9a-f-]{36}$/);
	});

	it('setUuid() adds a uuid child that round-trips through the parser', () => {
		const symbol = new KicadElementSymbol('MyLib_1_1');
		expect(symbol.getUuid()).toBeUndefined();

		symbol.setUuid('11111111-1111-1111-1111-111111111111');
		expect(symbol.getUuid()).toBe('11111111-1111-1111-1111-111111111111');

		const reparsed = new KicadParser().parse(symbol.write()) as KicadElementSymbol;
		expect(reparsed.getUuid()).toBe('11111111-1111-1111-1111-111111111111');
	});

	it('setUuid() generates a random uuid when none is given', () => {
		const symbol = new KicadElementSymbol('MyLib_1_1');
		symbol.setUuid();
		expect(symbol.getUuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
	});

	it('KicadElementProperty.addUuid() remains a working alias for setUuid()', () => {
		const prop = new KicadElementProperty('Reference', 'R1');
		prop.addUuid();
		expect(prop.getUuid()).toBeTruthy();
	});
});
