import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';
import { KicadElement } from '../src/KicadElement';
import { KicadElementInstances, KicadElementInstanceProject, KicadElementInstancePath } from '../src/KicadElementInstances';
import { KicadElementModel } from '../src/KicadElementModel';
import { KicadElementImage } from '../src/KicadElementImage';
import { KicadElementDimension } from '../src/KicadElementDimension';
import { KicadElementSetup, KicadElementStackup } from '../src/KicadElementSetup';
import { KicadElementFpPoly } from '../src/KicadElementPolygon';
import { KicadElementNetTiePadGroups, KicadElementPinFunction, KicadElementPinType } from '../src/KicadElementString';
import { KicadElementZoneConnect } from '../src/KicadElementNumeric';
import { KicadElementScale } from '../src/KicadElementOffset';

const fixturesDir = path.join(__dirname, 'fixtures', 'gigaesc');

function parseFixture(file: string): KicadElement {
	const data = readFileSync(path.join(fixturesDir, file), 'utf-8');
	return new KicadParser().parse(data);
}

describe('newly promoted KiCad 10 element classes', () => {
	it('parses symbol instance tracking into KicadElementInstances/Project/Path', () => {
		const root = parseFixture('CAN.kicad_sch');
		const instances = root.findAllChildrenByClass(KicadElementInstances);
		expect(instances.length).toBeGreaterThan(0);

		const projects = instances[0].getProjects();
		expect(projects.length).toBeGreaterThan(0);
		expect(projects[0]).toBeInstanceOf(KicadElementInstanceProject);
		expect(projects[0].projectName).toBeTruthy();

		const firstPath = projects[0].getPaths()[0];
		expect(firstPath).toBeInstanceOf(KicadElementInstancePath);
		expect(firstPath.pathValue).toMatch(/^\//);
		expect(firstPath.getReference()).toBeTruthy();
		expect(firstPath.getUnit()).toBeGreaterThan(0);
	});

	it('parses footprint 3D model references with offset/scale/rotate', () => {
		const root = parseFixture('DevKitX2-Castellated6L.kicad_pcb');
		const models = root.findAllChildrenByClass(KicadElementModel);
		expect(models.length).toBeGreaterThan(0);

		const model = models[0];
		expect(model.modelPath).toBeTruthy();

		const scale = model.findFirstChildByClass(KicadElementScale);
		expect(scale).toBeDefined();
		expect(scale!.complex).toBe(true);
		expect(scale!.findFirstChildByName('xyz')).toBeDefined();
	});

	it('parses embedded schematic images, decodes their base64 data, and exposes scale/uuid', () => {
		const root = parseFixture('ESP32.kicad_sch');
		const images = root.findAllChildrenByClass(KicadElementImage);
		expect(images.length).toBeGreaterThan(0);
		expect(images[0].getData()).toBeTruthy();
		expect(images[0].getScale()).toBeGreaterThan(0);
		expect(images[0].getUuid()).toBeTruthy();

		images[0].setScale(2);
		expect(images[0].getScale()).toBe(2);
	});

	it('parses board dimension annotations with full accessor coverage', () => {
		const root = parseFixture('DevKitX2-Castellated6L.kicad_pcb');
		const dimensions = root.findAllChildrenByClass(KicadElementDimension);
		expect(dimensions.length).toBeGreaterThan(0);

		const dim = dimensions[0];
		expect(dim.getDimensionType()).toBe('orthogonal');
		expect(dim.getLayer()).toBe('Dwgs.User');
		expect(dim.getUuid()).toBeTruthy();
		expect(dim.getHeight()).toBeGreaterThan(0);
		expect(typeof dim.getOrientation()).toBe('number');
		expect(dim.getPoints().length).toBe(2);

		dim.setHeight(9.99).setOrientation(2).setDimensionType('aligned');
		expect(dim.getHeight()).toBeCloseTo(9.99);
		expect(dim.getOrientation()).toBe(2);
		expect(dim.getDimensionType()).toBe('aligned');
	});

	it('parses the board setup/stackup blocks', () => {
		const root = parseFixture('DevKitX2-Castellated6L.kicad_pcb');
		const setup = root.findFirstChildByClass(KicadElementSetup);
		expect(setup).toBeDefined();

		const stackup = setup!.findFirstChildByClass(KicadElementStackup);
		expect(stackup).toBeDefined();
		expect(stackup!.findChildrenByName('layer').length).toBeGreaterThan(0);
	});

	it('parses footprint polygons (fp_poly) distinctly from graphic polygons (gr_poly)', () => {
		const root = parseFixture('DevKitX2-Castellated6L.kicad_pcb');
		const fpPolys = root.findAllChildrenByClass(KicadElementFpPoly);
		expect(fpPolys.length).toBeGreaterThan(0);
		expect(fpPolys[0].getLayer()).toBeTruthy();
	});

	it('parses pad pintype/pinfunction, net_tie_pad_groups and zone_connect', () => {
		const root = parseFixture('DevKitX2-Castellated6L.kicad_pcb');
		expect(root.findAllChildrenByClass(KicadElementPinType).length).toBeGreaterThan(0);
		expect(root.findAllChildrenByClass(KicadElementPinFunction).length).toBeGreaterThan(0);
		expect(root.findAllChildrenByClass(KicadElementNetTiePadGroups).length).toBeGreaterThan(0);
		expect(root.findAllChildrenByClass(KicadElementZoneConnect).length).toBeGreaterThan(0);
	});
});
