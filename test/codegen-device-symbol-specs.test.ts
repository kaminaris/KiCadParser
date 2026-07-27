/**
 * Regenerate Catalog/DeviceSymbolSpecs.ts from examples/sample-data/basic.kicad_sch.
 *
 * Run from shared/kicad-io/test:
 *   yarn vitest run codegen-device-symbol-specs.test.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { describe, it } from 'vitest';
import { KicadParser } from '../src/KicadParser';
import { KicadElementSymbol } from '../src/KicadElementSymbol';
import { KicadElementLibSymbols } from '../src/KicadElementLibSymbols';
import { KicadElementProperty } from '../src/KicadElementProperty';
import { KicadElementPin } from '../src/KicadElementPin';
import { KicadElementPolyline } from '../src/KicadElementPolyline';
import { KicadElementRectangle } from '../src/KicadElementStartEnd';
import { KicadElementArc } from '../src/KicadElementArc';
import { KicadElementCircle } from '../src/KicadElementCircle';
import { KicadElementPinNames } from '../src/KicadElementPinNames';
import { KicadElementPinNumbers } from '../src/KicadElementPinNumbers';

describe.skip('codegen DeviceSymbolSpecs (manual)', () => {
	it('writes DeviceSymbolSpecs.ts from basic.kicad_sch', () => {
		const data = readFileSync(path.join(__dirname, '../examples/sample-data/basic.kicad_sch'), 'utf8');
		const root = new KicadParser().parse(data);
		const lib = root.findFirstChildByClass(KicadElementLibSymbols)!;
		const tops = lib.findChildrenByClass(KicadElementSymbol).filter(s => s.symbolName?.includes(':'));
		const specs: Record<string, unknown> = {};
		for (const s of tops) {
			const pinNames = s.findFirstChildByClass(KicadElementPinNames);
			const pinNums = s.findFirstChildByClass(KicadElementPinNumbers);
			const props = s.findChildrenByClass(KicadElementProperty).map(p => {
				const at = p.getOrigin();
				const j = p.getJustify();
				const out: Record<string, unknown> = {
					name: p.propertyName,
					value: p.propertyValue,
					at: { x: at.x, y: at.y, rot: at.rotation },
					hide: p.isHidden()
				};
				if (j.horizontal && j.horizontal !== 'middle') {
					out.justifyH = j.horizontal;
				}
				if (j.vertical && j.vertical !== 'middle') {
					out.justifyV = j.vertical;
				}
				return out;
			});
			const units = s.findChildrenByClass(KicadElementSymbol)
				.filter(u => u.symbolName && !u.symbolName.includes(':'))
				.map(u => {
					const graphics: unknown[] = [];
					for (const c of u.children) {
						if (c instanceof KicadElementPolyline) {
							const pts = c.getPoints();
							const stroke = c.getStroke();
							const fill = c.getFill();
							const g: Record<string, unknown> = {
								t: 'pl',
								pts: pts.map(p => [p.x, p.y]),
								w: stroke.width
							};
							if (stroke.type && stroke.type !== 'default') {
								g.st = stroke.type;
							}
							if (fill && fill !== 'none') {
								g.fill = fill;
							}
							graphics.push(g);
						}
						else if (c instanceof KicadElementRectangle) {
							const se = c.getStartEnd();
							const stroke = c.getStroke();
							const fill = c.getFill();
							const g: Record<string, unknown> = {
								t: 'rect',
								s: [se.start.x, se.start.y],
								e: [se.end.x, se.end.y],
								w: stroke.width
							};
							if (stroke.type && stroke.type !== 'default') {
								g.st = stroke.type;
							}
							if (fill && fill !== 'none') {
								g.fill = fill;
							}
							graphics.push(g);
						}
						else if (c instanceof KicadElementArc) {
							const sme = c.getStartMidEnd();
							const stroke = c.getStroke();
							graphics.push({
								t: 'arc',
								s: [sme.start.x, sme.start.y],
								m: [sme.mid.x, sme.mid.y],
								e: [sme.end.x, sme.end.y],
								w: stroke.width
							});
						}
						else if (c instanceof KicadElementCircle) {
							const center = c.getCenter();
							const stroke = c.getStroke();
							const fill = c.getFill();
							const g: Record<string, unknown> = {
								t: 'cir',
								c: [center.x, center.y],
								r: c.getRadius(),
								w: stroke.width
							};
							if (fill && fill !== 'none') {
								g.fill = fill;
							}
							graphics.push(g);
						}
						else if (c instanceof KicadElementPin) {
							const origin = c.getOrigin();
							const typ = c.getType();
							const pin = c.getPin();
							const g: Record<string, unknown> = {
								t: 'pin',
								et: typ.electricalType,
								sh: typ.shape,
								at: [origin.x, origin.y, origin.rotation],
								len: c.getLength(),
								name: pin.name,
								num: pin.number
							};
							if (c.isHidden()) {
								g.hidden = true;
							}
							graphics.push(g);
						}
						else {
							throw new Error(`Unsupported graphic ${c.name} in ${u.symbolName}`);
						}
					}
					return { name: u.symbolName, graphics };
				});
			specs[s.symbolName!] = {
				pinNumbersHide: pinNums ? pinNums.isHidden() : false,
				hasPinNumbers: !!pinNums,
				pinNamesOffset: pinNames?.getOffset() ?? 0,
				pinNamesHide: pinNames?.isHidden() ?? false,
				props,
				units
			};
		}
		const ts =
			`/** Auto-generated from examples/sample-data/basic.kicad_sch — do not edit by hand.\n` +
			` * Regenerate: yarn vitest run codegen-device-symbol-specs.test.ts\n` +
			` */\n` +
			`import type { DeviceSymbolSpec } from './DeviceSymbolSpecTypes';\n\n` +
			`export const DEVICE_SYMBOL_SPECS: Record<string, DeviceSymbolSpec> = ${JSON.stringify(specs, null, '\t')};\n`;
		writeFileSync(path.join(__dirname, '../src/Catalog/DeviceSymbolSpecs.ts'), ts);
	});
});
