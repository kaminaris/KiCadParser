import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';
import { KicadElementUnit } from '../src/KicadElementNumeric';
import { KicadElement } from '../src/KicadElement';

function normalize(s: string): string {
	return s.replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim();
}

describe('KicadParser.parse', () => {
	it('round-trips a simple nested s-expression', () => {
		const input = '(kicad_sch (version 20260306) (generator "eeschema") (uuid "abc-123"))';
		const parser = new KicadParser();
		const root = parser.parse(input);

		expect(root.name).toBe('kicad_sch');
		expect(normalize(root.write())).toBe(normalize(input));
	});

	it('preserves quoted strings, numbers and yes/no booleans through a round-trip', () => {
		const input = '(pad "1" thru_hole circle (at 0 0) (size 1.778 1.778) (unlocked yes) (remove_unused_layers no))';
		const parser = new KicadParser();
		const root = parser.parse(input);

		expect(normalize(root.write())).toBe(normalize(input));
	});

	it('parses (unit 1) as a numeric element outside of a units container', () => {
		const parser = new KicadParser();
		const root = parser.parse('(symbol "U1_1_1" (unit 1))');
		const unit = root.findFirstChildByClass(KicadElementUnit);

		expect(unit).toBeInstanceOf(KicadElementUnit);
		expect(unit!.value).toBe(1);
	});

	it('parses the KiCad 10 footprint (units (unit (name ..) (pins ..))) jumper block without throwing', () => {
		// Regression test: KicadElementUnit.afterParse() used to require exactly one
		// numeric attribute, which crashed on this unrelated KiCad 10 "unit" shape.
		const input = '(units (unit (name "A") (pins "1" "2")))';
		const parser = new KicadParser();

		const root = parser.parse(input);
		const unit = root.findFirstChildByName('unit')!;

		expect(unit).not.toBeInstanceOf(KicadElementUnit);
		expect(unit).toBeInstanceOf(KicadElement);
		expect(normalize(root.write())).toBe(normalize(input));
	});
});
