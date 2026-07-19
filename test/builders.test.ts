import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';
import { KicadElementSetup, KicadElementStackup } from '../src/KicadElementSetup';
import { KicadElementLayer } from '../src/KicadElementLayer';
import { KicadElementModel } from '../src/KicadElementModel';
import { KicadElementInstances } from '../src/KicadElementInstances';

function roundTrip(text: string) {
	return new KicadParser().parse(text);
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
