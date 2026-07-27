import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';
import { KicadElementSetup, KicadElementStackup } from '../src/KicadElementSetup';
import { KicadElementLayer } from '../src/KicadElementLayer';
import { KicadElementModel } from '../src/KicadElementModel';
import { KicadElementInstances } from '../src/KicadElementInstances';
import { KicadElementSymbol } from '../src/KicadElementSymbol';
import { KicadElementLibSymbols } from '../src/KicadElementLibSymbols';
import { KicadElementPinNames } from '../src/KicadElementPinNames';
import { buildResistor, PASSIVE_SYMBOL_BUILDERS } from '../src/Builder/PassiveSymbolBuilder';
import {
	PASSIVE_LIB_BY_ID,
	devicePassiveLibSymbols,
	devicePassiveSymbol,
	type DeviceLibId
} from '../src/Catalog/DevicePassiveSymbols';
import { DEVICE_SYMBOL_SPECS } from '../src/Catalog/DeviceSymbolSpecs';

function roundTrip(text: string) {
	return new KicadParser().parse(text);
}

function normalize(s: string): string {
	return s.replace(/\s+/g, ' ').trim();
}

describe('KicadElementStackup builder', () => {
	it('builds a stackup from scratch and round-trips through the parser', () => {
		const setup = new KicadElementSetup();
		const stackup = setup.getOrCreateStackup();

		stackup.addLayer('F.Cu').setStackupType('copper').setThickness(0.035);
		stackup.addLayer('dielectric 1').setStackupType('core')
			.setThickness(1.51).setMaterial('FR4').setEpsilonR(4.5).setLossTangent(0.02)
			.setStackupColor('Green');
		stackup.addLayer('B.Cu').setStackupType('copper').setThickness(0.035);

		const written = setup.write();
		const reparsed = roundTrip(written);

		expect(reparsed).toBeInstanceOf(KicadElementSetup);
		const reStackup = (reparsed as KicadElementSetup).getStackup()!;
		expect(reStackup).toBeInstanceOf(KicadElementStackup);

		const layers = reStackup.getLayers();
		expect(layers.map(l => l.getLayerName())).toEqual(['F.Cu', 'dielectric 1', 'B.Cu']);

		const dielectric = layers[1];
		expect(dielectric.getStackupType()).toBe('core');
		expect(dielectric.getThickness()).toBeCloseTo(1.51);
		expect(dielectric.getMaterial()).toBe('FR4');
		expect(dielectric.getEpsilonR()).toBeCloseTo(4.5);
		expect(dielectric.getLossTangent()).toBeCloseTo(0.02);
		expect(dielectric.getStackupColor()).toBe('Green');
	});

	it('getOrCreateStackup() is idempotent', () => {
		const setup = new KicadElementSetup();
		const a = setup.getOrCreateStackup();
		const b = setup.getOrCreateStackup();
		expect(a).toBe(b);
	});
});

describe('KicadElementLayer as a plain layer reference (non-stackup use)', () => {
	it('still supports the pre-existing constructor-less usage', () => {
		const layer = new KicadElementLayer();
		layer.attributes.push({ value: 'F.SilkS', format: 'quoted' });
		expect(layer.getLayerName()).toBe('F.SilkS');
	});

	it('supports the new constructor form', () => {
		const layer = new KicadElementLayer('F.Cu');
		expect(layer.getLayerName()).toBe('F.Cu');
		expect(layer.write().trim()).toBe('(layer "F.Cu")');
	});
});

describe('KicadElementModel.create()', () => {
	it('builds a default identity offset/scale/rotate model block', () => {
		const model = KicadElementModel.create('${KICAD10_3DMODEL_DIR}/foo.step');

		const written = model.write();
		const reparsed = roundTrip(written) as KicadElementModel;

		expect(reparsed.modelPath).toBe('${KICAD10_3DMODEL_DIR}/foo.step');
		expect(reparsed.getOffset()).toEqual({ x: 0, y: 0, z: 0 });
		expect(reparsed.getScale()).toEqual({ x: 1, y: 1, z: 1 });
		expect(reparsed.getRotate()).toEqual({ x: 0, y: 0, z: 0 });
	});

	it('setOffset/setScale/setRotate accept custom values', () => {
		const model = new KicadElementModel('foo.step')
			.setOffset(1, 2, 3)
			.setScale(0.5, 0.5, 0.5)
			.setRotate(0, 0, 90);

		expect(model.getOffset()).toEqual({ x: 1, y: 2, z: 3 });
		expect(model.getScale()).toEqual({ x: 0.5, y: 0.5, z: 0.5 });
		expect(model.getRotate()).toEqual({ x: 0, y: 0, z: 90 });
	});
});

describe('KicadElementInstances builder', () => {
	it('builds project/path instance data and round-trips it', () => {
		const instances = new KicadElementInstances();
		instances.addProject('MyProject').addPath('/sheet-uuid/symbol-uuid', 'R1', 1);

		const written = instances.write();
		const reparsed = roundTrip(written) as KicadElementInstances;

		const projects = reparsed.getProjects();
		expect(projects).toHaveLength(1);
		expect(projects[0].projectName).toBe('MyProject');

		const paths = projects[0].getPaths();
		expect(paths).toHaveLength(1);
		expect(paths[0].pathValue).toBe('/sheet-uuid/symbol-uuid');
		expect(paths[0].getReference()).toBe('R1');
		expect(paths[0].getUnit()).toBe(1);
	});
});

describe('PassiveSymbolBuilder catalog', () => {
	const libIds = Object.keys(PASSIVE_LIB_BY_ID) as DeviceLibId[];

	it.each(libIds)('%s builds with Reference/Value/Footprint/Datasheet', (libId) => {
		const written = devicePassiveSymbol(libId);
		expect(written.startsWith('(symbol "')).toBe(true);
		expect(written).toContain(`(symbol "${libId}"`);
		expect(written).toContain('(property "Reference"');
		expect(written).toContain('(property "Value"');
		expect(written).toContain('(property "Footprint"');
		expect(written).toContain('(property "Datasheet"');
		expect(written).toContain('(pin_names');
		expect(written).toContain('(exclude_from_sim');
		expect(written).toContain('(in_pos_files');
		expect(written).toContain('(embedded_fonts');

		const reparsed = roundTrip(written) as KicadElementSymbol;
		expect(reparsed).toBeInstanceOf(KicadElementSymbol);
		expect(reparsed.symbolName).toBe(libId);
	});

	it('hides pin numbers when present; pin_names hide only when truth does', () => {
		const r = roundTrip(devicePassiveSymbol('Device:R')) as KicadElementSymbol;
		expect(r.arePinNumbersHidden()).toBe(true);
		expect(r.arePinNameLabelsHidden()).toBe(false);
		expect(r.findFirstChildByClass(KicadElementPinNames)?.getOffset()).toBe(0);

		const led = roundTrip(devicePassiveSymbol('Device:LED')) as KicadElementSymbol;
		expect(led.arePinNumbersHidden()).toBe(true);
		expect(led.arePinNameLabelsHidden()).toBe(true);

		const pot = roundTrip(devicePassiveSymbol('Device:R_Potentiometer')) as KicadElementSymbol;
		expect(pot.findFirstChildByName('pin_numbers')).toBeUndefined();
		expect(pot.arePinNameLabelsHidden()).toBe(true);
	});

	it('Device:C uses Description, empty Datasheet, empty pin names, visible pin_names', () => {
		const written = devicePassiveSymbol('Device:C');
		expect(written).toContain('(property "Description" "Unpolarized capacitor"');
		expect(written).not.toContain('ki_description');
		expect(written).toContain('(property "Datasheet" ""');
		expect(written).toMatch(/\(pin_names\s+\(offset 0\.254\)\s*\)/);
		expect(written).toContain('(name ""');
		expect(written).toContain('(exclude_from_sim no)');
		expect(written).toContain('(in_pos_files yes)');
		expect(written).toContain('(duplicate_pin_numbers_are_jumpers no)');
		expect(written).toContain('(embedded_fonts no)');
	});

	it('devicePassiveLibSymbols wraps Device:R', () => {
		const wrapped = devicePassiveLibSymbols('Device:R');
		expect(wrapped.startsWith('(lib_symbols')).toBe(true);
		expect(wrapped).toContain('(symbol "Device:R"');
	});

	it('buildResistor accepts reference/value overrides', () => {
		const written = buildResistor({ reference: 'R', value: '10k' }).write();
		expect(written).toContain('(property "Reference" "R"');
		expect(written).toContain('(property "Value" "10k"');
		expect(written).toContain('(rectangle');
		expect(written).toContain('(at 0 3.81 270)');
		expect(written).toContain('(at 0 -3.81 90)');
	});
});

describe('Device:* builders vs basic.kicad_sch truth', () => {
	const schPath = path.join(__dirname, '../examples/sample-data/basic.kicad_sch');
	const root = new KicadParser().parse(readFileSync(schPath, 'utf-8'));
	const lib = root.findFirstChildByClass(KicadElementLibSymbols)!;
	const truthById = new Map<string, KicadElementSymbol>();
	for (const sym of lib.findChildrenByClass(KicadElementSymbol)) {
		if (sym.symbolName?.includes(':')) {
			truthById.set(sym.symbolName, sym);
		}
	}

	const truthLibIds = Object.keys(DEVICE_SYMBOL_SPECS);

	it('lists every top-level lib_symbols entry', () => {
		expect([...truthById.keys()].sort()).toEqual([...truthLibIds].sort());
	});

	it.each(truthLibIds)('%s builder write matches truth write (whitespace-normalized)', (libId) => {
		const truth = truthById.get(libId)!;
		const builder = PASSIVE_SYMBOL_BUILDERS[libId as keyof typeof PASSIVE_SYMBOL_BUILDERS];
		expect(builder).toBeTypeOf('function');
		const built = builder();
		expect(normalize(built.write())).toBe(normalize(truth.write()));
	});
});
