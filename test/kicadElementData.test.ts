import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';
import { KicadElementData } from '../src/KicadElementData';

describe('KicadElementData', () => {
	it('decodes base64 payloads without relying on a browser window global', () => {
		// Regression test: afterParse()/write() used to call window.atob/window.btoa,
		// which throws "window is not defined" outside a browser (e.g. under Node/vitest,
		// which is how embedded bitmap data in KiCad 10 schematics was crashing the parser).
		const input = '(data "aGVsbG8gd29ybGQ=")';
		const parser = new KicadParser();

		const root = parser.parse(input);
		expect(root).toBeInstanceOf(KicadElementData);
		expect((root as KicadElementData).data).toBe('hello world');
		expect(root.write().trim()).toBe(input);
	});

	it('round-trips multi-line base64 data split across 76-char chunks', () => {
		const original = 'x'.repeat(200);
		const el = new KicadElementData();
		el.name = 'data';
		el.data = original;

		const written = el.write();
		const parser = new KicadParser();
		const reparsed = parser.parse(written) as KicadElementData;

		expect(reparsed.data).toBe(original);
	});
});
