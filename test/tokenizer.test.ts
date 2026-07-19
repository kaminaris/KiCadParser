import { describe, expect, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';

describe('KicadParser.tokenizeKicad', () => {
	it('tokenizes parens, symbols, numbers and strings', () => {
		const parser = new KicadParser();
		const tokens = parser.tokenizeKicad('(at 1.5 -2 90 "hello world")');

		expect(tokens).toEqual([
			{ type: 'paren', value: '(' },
			{ type: 'symbol', value: 'at' },
			{ type: 'number', value: '1.5' },
			{ type: 'number', value: '-2' },
			{ type: 'number', value: '90' },
			{ type: 'string', value: 'hello world' },
			{ type: 'paren', value: ')' }
		]);
	});

	it('unescapes quotes inside strings', () => {
		const parser = new KicadParser();
		const tokens = parser.tokenizeKicad('"say \\"hi\\""');

		expect(tokens).toEqual([{ type: 'string', value: 'say "hi"' }]);
	});

	it('treats bare words that look numeric-but-arent as symbols', () => {
		const parser = new KicadParser();
		const tokens = parser.tokenizeKicad('(layer F.Cu)');

		expect(tokens.map(t => t.value)).toEqual(['(', 'layer', 'F.Cu', ')']);
		expect(tokens[2].type).toBe('symbol');
	});
});
