import { readFileSync } from 'fs';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';
import { KicadElementBus, KicadElementBusEntry } from '../src/KicadElementBus';
import { KicadElementHierarchicalLabel } from '../src/KicadElementHierarchicalLabel';
import { KicadElementGroup } from '../src/KicadElementGroup';
import { KicadElementComponentClasses, KicadElementComponentClass } from '../src/KicadElementComponentClass';
import { KicadElementRuleArea } from '../src/KicadElementRuleArea';
import { KicadElementNetclassFlag } from '../src/KicadElementNetclassFlag';

/**
 * Fixtures hand-authored in real KiCad 10 (kicad-test.kicad_sch/.kicad_pcb,
 * TestSheet.kicad_sch), specifically to exercise bus/bus_entry,
 * hierarchical_label, group, and KiCad 10's multichannel design features
 * (rule_area, netclass_flag, component_classes/component_class).
 */

const fixturesDir = path.join(__dirname, 'fixtures', 'kicad-test');

function readFixture(file: string): string {
	return readFileSync(path.join(fixturesDir, file), 'utf-8');
}

function normalize(s: string): string {
	return s.replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim();
}

describe('kicad-test fixtures (hand-authored in real KiCad 10)', () => {
	it.each(['kicad-test.kicad_sch', 'kicad-test.kicad_pcb', 'TestSheet.kicad_sch'])(
		'parses %s without throwing',
		(file) => {
			const root = new KicadParser().parse(readFixture(file));
			expect(root.children.length).toBeGreaterThan(0);
		}
	);

	it('kicad-test.kicad_sch round-trips exactly and uses bus/hierarchical_label classes', () => {
		const data = readFixture('kicad-test.kicad_sch');
		const root = new KicadParser().parse(data);
		expect(normalize(root.write())).toBe(normalize(data));

		expect(root.findAllChildrenByClass(KicadElementBus).length).toBeGreaterThan(0);
		expect(root.findAllChildrenByClass(KicadElementBusEntry).length).toBeGreaterThan(0);

		const hLabel = root.findFirstChildByClass(KicadElementHierarchicalLabel)!;
		expect(hLabel.getName()).toBe('hierarchical');
		expect(hLabel.getShape()).toBe('input');
		expect(hLabel.getUuid()).toBeTruthy();
	});

	it('kicad-test.kicad_sch: multichannel rule_area and netclass_flag round-trip with accessors', () => {
		const data = readFixture('kicad-test.kicad_sch');
		const root = new KicadParser().parse(data);
		expect(normalize(root.write())).toBe(normalize(data));

		const areas = root.findAllChildrenByClass(KicadElementRuleArea);
		expect(areas.length).toBe(3);
		expect(areas[0].isDnp()).toBe(false);
		expect(areas[0].getPolyline()?.getPoints().length).toBeGreaterThan(0);
		expect(areas[0].getPolyline()?.getUuid()).toBeTruthy();

		const flag = root.findFirstChildByClass(KicadElementNetclassFlag)!;
		expect(flag.getUuid()).toBeTruthy();
		expect(flag.getOrigin().x).toBeCloseTo(173.99);
	});

	it('kicad-test.kicad_pcb round-trips (modulo the known dashed_line formatting) with a group', () => {
		const data = readFixture('kicad-test.kicad_pcb');
		const root = new KicadParser().parse(data);
		const written = normalize(root.write());
		const expected = normalize(data)
			.replace('(dashed_line_dash_ratio 12)', '(dashed_line_dash_ratio 12.000000)')
			.replace('(dashed_line_gap_ratio 3)', '(dashed_line_gap_ratio 3.000000)');
		expect(written).toBe(expected);

		const group = root.findFirstChildByClass(KicadElementGroup)!;
		expect(group.groupName).toBe('');
		expect(group.getUuid()).toBeTruthy();
		expect(group.getMemberUuids().length).toBe(2);
	});

	it('kicad-test.kicad_pcb: multichannel component_classes/component_class round-trip with accessors', () => {
		const data = readFixture('kicad-test.kicad_pcb');
		const root = new KicadParser().parse(data);

		const classes = root.findAllChildrenByClass(KicadElementComponentClasses);
		expect(classes.length).toBe(6);
		expect(classes.map(c => c.getClassNames()[0]).sort()).toEqual(['Comp1', 'Comp1', 'Comp2', 'Comp2', 'Comp3', 'Comp3']);

		const placementClasses = root.findAllChildrenByClass(KicadElementComponentClass);
		expect(placementClasses.length).toBe(3);
		expect(placementClasses.map(c => c.className).sort()).toEqual(['Comp1', 'Comp2', 'Comp3']);
	});
});
