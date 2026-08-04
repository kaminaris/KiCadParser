import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';
import { KicadElementWire } from '../src/KicadElementWire';
import { KicadElementArc } from '../src/KicadElementArc';
import { KicadElementJunction } from '../src/KicadElementJunction';
import { KicadElementNoConnect } from '../src/KicadElementNoConnect';
import { KicadElementBus, KicadElementBusEntry } from '../src/KicadElementBus';
import { KicadElementRectangle } from '../src/KicadElementStartEnd';
import { KicadElementNetclassFlag } from '../src/KicadElementNetclassFlag';
import { KicadElementRuleArea } from '../src/KicadElementRuleArea';

/**
 * Freshly-constructed (not parsed) schematic elements, for the hand-drawn
 * schematic editor: confirms each class can be built from scratch, written,
 * and reparsed back to the same values — the construct-and-attach pattern
 * the editor's KicadRenderSession mutation methods rely on.
 */
describe('freshly-constructed schematic edit elements', () => {
	it('KicadElementWire: points + stroke + uuid round-trip', () => {
		const wire = new KicadElementWire();
		wire.setPoints([{ x: 10, y: 20 }, { x: 30, y: 20 }]);
		wire.setStroke(0, 'default');
		wire.setUuid('11111111-1111-1111-1111-111111111111');

		const reparsed = new KicadParser().parse(wire.write()) as KicadElementWire;
		expect(reparsed.getPoints()).toEqual([{ x: 10, y: 20 }, { x: 30, y: 20 }]);
		expect(reparsed.getStroke()).toEqual({ width: 0, type: 'default' });
		expect(reparsed.getUuid()).toBe('11111111-1111-1111-1111-111111111111');
	});

	it('KicadElementArc: schematic-root arc gets a real uuid and start/mid/end round-trip', () => {
		const arc = new KicadElementArc();
		arc.setStartMidEnd(0, 0, 5, -5, 10, 0);
		arc.setStroke(0, 'default');
		arc.setUuid('22222222-2222-2222-2222-222222222222');

		const reparsed = new KicadParser().parse(arc.write()) as KicadElementArc;
		expect(reparsed.getStartMidEnd()).toEqual({
			start: { x: 0, y: 0 },
			mid: { x: 5, y: -5 },
			end: { x: 10, y: 0 },
		});
		expect(reparsed.getUuid()).toBe('22222222-2222-2222-2222-222222222222');
	});

	it('KicadElementArc: a symbol-library-style arc (no setUuid call) has no uuid child', () => {
		const arc = new KicadElementArc();
		arc.setStartMidEnd(-2.032, -1.27, 0, -0.5572, 2.032, -1.27);
		arc.setStroke(0.508, 'default');
		expect(arc.getUuid()).toBeUndefined();
		expect(arc.write()).not.toContain('uuid');
	});

	it('KicadElementJunction: diameter + color + origin + uuid round-trip', () => {
		const junction = new KicadElementJunction();
		junction.setOrigin(15.24, 7.62);
		junction.setDiameter(0);
		junction.setColor(0, 0, 0, 0);
		junction.setUuid('33333333-3333-3333-3333-333333333333');

		// Real KiCad's parser (unlike this project's own, which is lenient) rejects
		// a 3-arg (at x y 0) here since junction's grammar has no rotation slot.
		expect(junction.write()).toContain('(at 15.24 7.62)');
		expect(junction.write()).not.toMatch(/\(at 15\.24 7\.62 0\)/);

		const reparsed = new KicadParser().parse(junction.write()) as KicadElementJunction;
		expect(reparsed.getOrigin()).toEqual({ x: 15.24, y: 7.62, rotation: 0 });
		expect(reparsed.getDiameter()).toBe(0);
		expect(reparsed.getColor()).toBe('rgba(0,0,0,0)');
		expect(reparsed.getUuid()).toBe('33333333-3333-3333-3333-333333333333');
	});

	it('KicadElementNoConnect: origin + uuid round-trip, no spurious rotation', () => {
		const nc = new KicadElementNoConnect();
		nc.setOrigin(132.08, 82.55);
		nc.setUuid('44444444-4444-4444-4444-444444444444');

		// Same grammar constraint as junction — (at x y), never (at x y 0).
		expect(nc.write()).toContain('(at 132.08 82.55)');
		expect(nc.write()).not.toMatch(/\(at 132\.08 82\.55 0\)/);

		const reparsed = new KicadParser().parse(nc.write()) as KicadElementNoConnect;
		expect(reparsed.getOrigin()).toEqual({ x: 132.08, y: 82.55, rotation: 0 });
		expect(reparsed.getUuid()).toBe('44444444-4444-4444-4444-444444444444');
	});

	it('KicadElementJunction: dragging (setOrigin with rotation forwarded from getOrigin) stays 2-arg', () => {
		// Mirrors KicadRenderSession.translateElementById, which reads getOrigin()
		// (rotation defaults to 0) and forwards it straight into setOrigin — must
		// not let that resurrect a rotation slot that was never really there.
		const junction = new KicadElementJunction();
		junction.setOrigin(10, 10);
		const o = junction.getOrigin();
		junction.setOrigin(o.x + 5, o.y + 5, o.rotation);

		expect(junction.write()).toContain('(at 15 15)');
		expect(junction.write()).not.toMatch(/\(at 15 15 0\)/);
	});

	it('KicadElementBus: points + stroke + uuid round-trip (same shape as Wire)', () => {
		const bus = new KicadElementBus();
		bus.setPoints([{ x: 10, y: 20 }, { x: 30, y: 20 }]);
		bus.setStroke(0, 'default');
		bus.setUuid('55555555-5555-5555-5555-555555555555');

		const reparsed = new KicadParser().parse(bus.write()) as KicadElementBus;
		expect(reparsed.getPoints()).toEqual([{ x: 10, y: 20 }, { x: 30, y: 20 }]);
		expect(reparsed.getUuid()).toBe('55555555-5555-5555-5555-555555555555');
	});

	it('KicadElementBusEntry: origin + size + uuid round-trip, no spurious rotation', () => {
		const entry = new KicadElementBusEntry();
		entry.setOrigin(69.85, 62.23);
		entry.setSize(2.54, -2.54);
		entry.setUuid('66666666-6666-6666-6666-666666666666');

		// Same grammar constraint as junction/no_connect — (at x y), never (at x y 0).
		expect(entry.write()).toContain('(at 69.85 62.23)');
		expect(entry.write()).not.toMatch(/\(at 69\.85 62\.23 0\)/);

		const reparsed = new KicadParser().parse(entry.write()) as KicadElementBusEntry;
		expect(reparsed.getOrigin()).toEqual({ x: 69.85, y: 62.23, rotation: 0 });
		expect(reparsed.getSize()).toEqual({ width: 2.54, height: -2.54 });
		expect(reparsed.getUuid()).toBe('66666666-6666-6666-6666-666666666666');
	});

	it('WithStartEnd.setStartEnd() called twice does not accumulate duplicate children', () => {
		const rect = new KicadElementRectangle(0, 0, 10, 10);
		expect(rect.children.length).toBe(2); // Start, End

		// Simulates a live drag: setStartEnd called again on the same instance.
		rect.setStartEnd(5, 5, 15, 15);
		expect(rect.children.length).toBe(2);
		expect(rect.getStartEnd()).toEqual({ start: { x: 5, y: 5 }, end: { x: 15, y: 15 } });
	});

	it('WithStartMidEnd.setStartMidEnd() called twice does not accumulate duplicate children', () => {
		const arc = new KicadElementArc();
		arc.setStartMidEnd(0, 0, 5, -5, 10, 0);
		expect(arc.children.length).toBe(3); // Start, Mid, End

		arc.setStartMidEnd(1, 1, 6, -4, 11, 1);
		expect(arc.children.length).toBe(3);
		expect(arc.getStartMidEnd()).toEqual({
			start: { x: 1, y: 1 },
			mid: { x: 6, y: -4 },
			end: { x: 11, y: 1 },
		});
	});

	it('KicadElementNetclassFlag: origin + shape + length + name(Netclass property) round-trip', () => {
		const flag = new KicadElementNetclassFlag();
		flag.setOrigin(173.99, 66.04, 0);
		flag.setShape('round');
		flag.setPinLength(2.54);
		flag.setName('PWR');
		flag.setUuid('77777777-7777-7777-7777-777777777777');

		expect(flag.getName()).toBe('PWR');
		expect(flag.getNetclassName()).toBe('PWR');
		// Real KiCad's parser does an unconditional NeedSYMBOL() right after
		// the tag name for all 4 label kinds — a fresh instance (setName
		// proxies to the Netclass property, never touching this.attributes)
		// must still emit an explicit "" token or a real KiCad load fails,
		// even though this app's own lenient parser wouldn't have caught it.
		expect(flag.write()).toMatch(/^\(netclass_flag ""/);

		const reparsed = new KicadParser().parse(flag.write()) as KicadElementNetclassFlag;
		expect(reparsed.getOrigin()).toEqual({ x: 173.99, y: 66.04, rotation: 0 });
		expect(reparsed.getShape()).toBe('round');
		expect(reparsed.getPinLength()).toBe(2.54);
		expect(reparsed.getName()).toBe('PWR');
		expect(reparsed.getUuid()).toBe('77777777-7777-7777-7777-777777777777');
	});

	it('KicadElementNetclassFlag: parses a real netclass_flag with an empty top-level text and a second unrelated property, losing neither', () => {
		// Verbatim from a live schematic (user-supplied) — top-level text is
		// empty (the real name lives in the Netclass property) and a second,
		// unrelated "Component Class" property sits alongside it. Neither
		// KicadElementNetclassFlag's own accessors nor round-tripping should
		// drop the second property, even though nothing here reads it back
		// via a typed accessor (WithProperties' generic storage covers it).
		const text = `(netclass_flag ""
	(length 2.54)
	(shape round)
	(at 317.5 83.82 0)
	(fields_autoplaced yes)
	(effects
		(font (size 1.27 1.27))
		(justify left bottom)
	)
	(uuid "3202342f-133d-4499-aa1a-7121aa7dee1a")
	(property "Netclass" ""
		(at -76.2 -91.44 0)
		(show_name no)
		(do_not_autoplace no)
		(effects
			(font (size 1.27 1.27))
		)
	)
	(property "Component Class" "PH-1"
		(at 318.1096 81.28 0)
		(show_name no)
		(do_not_autoplace no)
		(effects
			(font (size 1.27 1.27) (italic yes))
			(justify left)
		)
	)
)`;
		const parsed = new KicadParser().parse(text) as KicadElementNetclassFlag;
		expect(parsed).toBeInstanceOf(KicadElementNetclassFlag);
		expect(parsed.getName()).toBe('');
		expect(parsed.getShape()).toBe('round');
		expect(parsed.getPinLength()).toBe(2.54);
		expect(parsed.getAllProperties()['Component Class']).toBe('PH-1');

		const rewritten = new KicadParser().parse(parsed.write()) as KicadElementNetclassFlag;
		expect(rewritten.getAllProperties()['Component Class']).toBe('PH-1');
		expect(rewritten.getAllProperties()['Netclass']).toBe('');
	});

	it('KicadElementRuleArea: parses a real rule_area, uuid delegates to the nested polyline, round-trips', () => {
		// Verbatim from the same live schematic as the netclass_flag fixture
		// above — a dashed, unfilled, width:0 grouping rectangle. This exact
		// shape (before the StrokeDash fix elsewhere in this session) hung
		// the whole app on render; this test only covers parse/accessor/
		// write correctness, not the render-time infinite-loop regression
		// (that lives in kicad-render, which has no test runner of its own).
		const text = `(rule_area
	(exclude_from_sim no)
	(in_bom yes)
	(on_board yes)
	(dnp no)
	(polyline
		(pts
			(xy 270.51 83.82) (xy 270.51 133.35) (xy 312.42 133.35) (xy 317.5 128.27) (xy 317.5 83.82)
		)
		(stroke
			(width 0)
			(type dash)
		)
		(fill
			(type none)
		)
		(uuid "bea6db49-71dd-45d6-806b-af7e355686fa")
	)
)`;
		const parsed = new KicadParser().parse(text) as KicadElementRuleArea;
		expect(parsed).toBeInstanceOf(KicadElementRuleArea);
		expect(parsed.getUuid()).toBe('bea6db49-71dd-45d6-806b-af7e355686fa');
		expect(parsed.isDnp()).toBe(false);
		expect(parsed.isInBom()).toBe(true);
		expect(parsed.isOnBoard()).toBe(true);
		expect(parsed.isExcludedFromSim()).toBe(false);
		const poly = parsed.getPolyline();
		expect(poly).toBeDefined();
		expect(poly!.getPoints()).toEqual([
			{ x: 270.51, y: 83.82 }, { x: 270.51, y: 133.35 }, { x: 312.42, y: 133.35 },
			{ x: 317.5, y: 128.27 }, { x: 317.5, y: 83.82 },
		]);
		expect(poly!.getStroke()).toEqual({ width: 0, type: 'dash' });

		const rewritten = new KicadParser().parse(parsed.write()) as KicadElementRuleArea;
		expect(rewritten.getUuid()).toBe('bea6db49-71dd-45d6-806b-af7e355686fa');
		expect(rewritten.getPolyline()!.getPoints()).toEqual(poly!.getPoints());
	});
});
