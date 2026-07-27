/**
 * Programmatic KiCad Device:* / power:* library-symbol builders.
 * Truth-aligned Device:* geometry comes from {@link ../Catalog/DeviceSymbolSpecs}
 * (extracted from examples/sample-data/basic.kicad_sch).
 */

import { KicadElementArc } from '../KicadElementArc';
import { KicadElementCircle } from '../KicadElementCircle';
import { KicadElementEffects } from '../KicadElementEffects';
import type { KicadFillType } from '../KicadElementFill';
import { KicadElement } from '../KicadElement';
import { KicadElementName } from '../KicadElementName';
import { KicadElementNumber } from '../KicadElementNumber';
import { KicadElementPin, type KicadPinElectricalType } from '../KicadElementPin';
import { KicadElementPolyline } from '../KicadElementPolyline';
import { KicadElementRectangle } from '../KicadElementStartEnd';
import type { KicadStrokeType } from '../KicadElementStroke';
import {
	KicadElementSymbol,
	type KicadSymbolLibraryPropertiesOpts,
	type KicadSymbolPropAt
} from '../KicadElementSymbol';
import { DEVICE_SYMBOL_SPECS } from '../Catalog/DeviceSymbolSpecs';
import type { DeviceGraphic, DeviceSymbolSpec } from '../Catalog/DeviceSymbolSpecTypes';

/** @deprecated Prefer {@link KicadSymbolPropAt}. */
export type PropAt = KicadSymbolPropAt;

/** @deprecated Prefer {@link KicadSymbolLibraryPropertiesOpts}. */
export type StandardLibraryPropertyOpts = KicadSymbolLibraryPropertiesOpts;

export type PassiveSymbolOpts = {
	reference?: string;
	value?: string;
	footprint?: string;
	datasheet?: string;
};

export type PassivePinOpts = {
	name: string;
	number: string;
	x: number;
	y: number;
	rot: number;
	length: number;
	electricalType?: KicadPinElectricalType;
	hidden?: boolean;
};

const FONT = 1.27;

function unitSymbolName(libId: string, suffix: string): string {
	const short = libId.includes(':') ? libId.slice(libId.indexOf(':') + 1) : libId;
	return `${short}_${suffix}`;
}

function setLabelFont(el: KicadElement): void {
	const effects = el.findOrCreateChildByClass(KicadElementEffects);
	effects.setFont(FONT, FONT);
}

/** @deprecated Prefer `KicadElementSymbol.buildLibraryProperty(...)`. */
export function buildLibraryProperty(
	name: string,
	value: string,
	opts: {
		x: number;
		y: number;
		rot?: number;
		hide?: boolean;
		justify?: import('../KicadElementJustify').KicadJustifyHorizontal;
	}
) {
	return KicadElementSymbol.buildLibraryProperty(name, value, opts);
}

/** @deprecated Prefer `sym.addStandardLibraryProperties(opts)`. */
export function addStandardLibraryProperties(
	sym: KicadElementSymbol,
	opts: KicadSymbolLibraryPropertiesOpts
): void {
	sym.addStandardLibraryProperties(opts);
}

export function makePassivePin(opts: PassivePinOpts): KicadElementPin {
	const pin = new KicadElementPin();
	pin.setType(opts.electricalType ?? 'passive', 'line');
	pin.setOrigin(opts.x, opts.y, opts.rot);
	pin.setLength(opts.length);
	pin.setPin(opts.name, opts.number);
	if (opts.hidden) {
		pin.setHidden(true);
	}
	const nameEl = pin.findFirstChildByClass(KicadElementName);
	const numEl = pin.findFirstChildByClass(KicadElementNumber);
	if (nameEl) {
		setLabelFont(nameEl);
	}
	if (numEl) {
		setLabelFont(numEl);
	}
	return pin;
}

function makePolyline(
	points: Array<[number, number]>,
	strokeWidth: number,
	fill: KicadFillType = 'none',
	strokeType: KicadStrokeType = 'default'
): KicadElementPolyline {
	const pl = new KicadElementPolyline();
	pl.setPoints(points.map(([x, y]) => ({ x, y })));
	pl.setStroke(strokeWidth, strokeType);
	pl.setFill(fill);
	return pl;
}

function makeArc(
	sx: number,
	sy: number,
	mx: number,
	my: number,
	ex: number,
	ey: number,
	strokeWidth: number
): KicadElementArc {
	const arc = new KicadElementArc();
	arc.setStartMidEnd(sx, sy, mx, my, ex, ey);
	arc.setStroke(strokeWidth);
	arc.setFill('none');
	return arc;
}

function makeRect(
	sx: number,
	sy: number,
	ex: number,
	ey: number,
	strokeWidth: number,
	fill: KicadFillType = 'none',
	strokeType: KicadStrokeType = 'default'
): KicadElementRectangle {
	const rect = new KicadElementRectangle(sx, sy, ex, ey);
	rect.setStroke(strokeWidth, strokeType);
	rect.setFill(fill);
	return rect;
}

function makeCircle(
	cx: number,
	cy: number,
	radius: number,
	strokeWidth: number,
	fill: KicadFillType = 'none'
): KicadElementCircle {
	const circle = new KicadElementCircle(cx, cy, radius);
	circle.setStroke(strokeWidth);
	circle.setFill(fill);
	return circle;
}

function beginDeviceSymbol(
	libId: string,
	opts: {
		pinNameOffset: number;
		hidePinNames?: boolean;
		hidePinNumbers?: boolean;
	}
): KicadElementSymbol {
	const sym = new KicadElementSymbol(libId);
	if (opts.hidePinNumbers !== false) {
		sym.togglePinNumbers(false);
	}
	if (opts.hidePinNames) {
		sym.togglePinNames(false, opts.pinNameOffset);
	}
	else {
		sym.setPinNameOffset(opts.pinNameOffset);
	}
	sym.setExcludeFromSim(false);
	sym.setInBom(true).setOnBoard(true);
	sym.setInPosFiles(true);
	sym.setDuplicatePinNumbersAreJumpers(false);
	return sym;
}

function finishDeviceSymbol(sym: KicadElementSymbol): KicadElementSymbol {
	sym.setEmbeddedFonts(false);
	return sym;
}

function addUnitPair(
	sym: KicadElementSymbol,
	libId: string,
	fillBody: (unit: KicadElementSymbol) => void,
	fillPins: (unit: KicadElementSymbol) => void
): void {
	const bodyUnit = new KicadElementSymbol(unitSymbolName(libId, '0_1'));
	fillBody(bodyUnit);
	sym.addChild(bodyUnit);
	const pinUnit = new KicadElementSymbol(unitSymbolName(libId, '1_1'));
	fillPins(pinUnit);
	sym.addChild(pinUnit);
}

function applyGraphic(unit: KicadElementSymbol, g: DeviceGraphic): void {
	switch (g.t) {
		case 'pl':
			unit.addChild(makePolyline(g.pts, g.w, g.fill ?? 'none', g.st ?? 'default'));
			break;
		case 'rect':
			unit.addChild(makeRect(g.s[0], g.s[1], g.e[0], g.e[1], g.w, g.fill ?? 'none', g.st ?? 'default'));
			break;
		case 'arc':
			unit.addChild(makeArc(g.s[0], g.s[1], g.m[0], g.m[1], g.e[0], g.e[1], g.w));
			break;
		case 'cir':
			unit.addChild(makeCircle(g.c[0], g.c[1], g.r, g.w, g.fill ?? 'none'));
			break;
		case 'pin':
			unit.addChild(
				makePassivePin({
					name: g.name,
					number: g.num,
					x: g.at[0],
					y: g.at[1],
					rot: g.at[2],
					length: g.len,
					electricalType: g.et,
					hidden: g.hidden
				})
			);
			break;
	}
}

/**
 * Materialize a Device:* library symbol from a truth-extracted spec.
 */
export function buildDeviceSymbolFromSpec(
	libId: string,
	spec: DeviceSymbolSpec,
	opts?: PassiveSymbolOpts
): KicadElementSymbol {
	const sym = beginDeviceSymbol(libId, {
		pinNameOffset: spec.pinNamesOffset,
		hidePinNames: spec.pinNamesHide,
		hidePinNumbers: spec.hasPinNumbers && spec.pinNumbersHide
	});

	for (const prop of spec.props) {
		let value = prop.value;
		if (prop.name === 'Reference' && opts?.reference !== undefined) {
			value = opts.reference;
		}
		else if (prop.name === 'Value' && opts?.value !== undefined) {
			value = opts.value;
		}
		else if (prop.name === 'Footprint' && opts?.footprint !== undefined) {
			value = opts.footprint;
		}
		else if (prop.name === 'Datasheet' && opts?.datasheet !== undefined) {
			value = opts.datasheet;
		}
		sym.addChild(
			KicadElementSymbol.buildLibraryProperty(prop.name, value, {
				x: prop.at.x,
				y: prop.at.y,
				rot: prop.at.rot,
				hide: prop.hide,
				justify: prop.justifyH,
				justifyVertical: prop.justifyV
			})
		);
	}

	for (const unitSpec of spec.units) {
		const unit = new KicadElementSymbol(unitSpec.name);
		for (const g of unitSpec.graphics) {
			applyGraphic(unit, g);
		}
		sym.addChild(unit);
	}

	return finishDeviceSymbol(sym);
}

function buildFromCatalog(libId: string, opts?: PassiveSymbolOpts): KicadElementSymbol {
	const spec = DEVICE_SYMBOL_SPECS[libId];
	if (!spec) {
		throw new Error(`No DeviceSymbolSpec for ${libId}`);
	}
	return buildDeviceSymbolFromSpec(libId, spec, opts);
}

// —— Truth-aligned Device:* builders ————————————————————————————————

export function buildResistor(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:R', opts);
}

export function buildCapacitor(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:C', opts);
}

export function buildInductor(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:L', opts);
}

export function buildFerriteBead(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:FerriteBead', opts);
}

export function buildDiode(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:D', opts);
}

export function buildSchottky(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:D_Schottky', opts);
}

export function buildLed(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:LED', opts);
}

export function buildPotentiometer(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:R_Potentiometer', opts);
}

export function buildCapacitorPolarized(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:C_Polarized', opts);
}

export function buildZener(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:D_Zener', opts);
}

export function buildCrystal(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:Crystal', opts);
}

export function buildFuse(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:Fuse', opts);
}

export function buildTvs(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:D_TVS', opts);
}

export function buildNmos(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:Q_NMOS', opts);
}

export function buildNpn(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:Q_NPN', opts);
}

export function buildPmos(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:Q_PMOS', opts);
}

export function buildPnp(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:Q_PNP', opts);
}

export function buildThermistor(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:Thermistor', opts);
}

export function buildThermistorNtc(opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildFromCatalog('Device:Thermistor_NTC', opts);
}

// —— Variants not in basic.kicad_sch (BOM / legacy) ——————————————————

export function buildPowerGnd(opts?: PassiveSymbolOpts): KicadElementSymbol {
	const libId = 'power:GND';
	const sym = new KicadElementSymbol(libId);
	const power = new KicadElement();
	power.name = 'power';
	sym.addChild(power);
	sym.setPinNameOffset(0);
	sym.togglePinNumbers(false);
	sym.setExcludeFromSim(false);
	sym.setInBom(true).setOnBoard(true);
	sym.setInPosFiles(true);
	sym.setDuplicatePinNumbersAreJumpers(false);
	sym.addStandardLibraryProperties({
		reference: opts?.reference ?? '#PWR',
		value: opts?.value ?? 'GND',
		footprint: opts?.footprint ?? '',
		datasheet: opts?.datasheet ?? '',
		description: 'Power symbol creates a global label with name GND',
		refAt: { x: 0, y: -6.35 },
		valAt: { x: 0, y: -3.81 },
		refHidden: true,
		valHidden: true
	});
	addUnitPair(
		sym,
		libId,
		body => {
			body.addChild(
				makePolyline(
					[
						[0, 0],
						[0, -1.27],
						[1.27, -1.27],
						[0, -2.54],
						[-1.27, -1.27],
						[0, -1.27]
					],
					0
				)
			);
		},
		pins => {
			pins.addChild(
				makePassivePin({
					name: 'GND',
					number: '1',
					x: 0,
					y: 0,
					rot: 270,
					length: 0,
					electricalType: 'power_in',
					hidden: true
				})
			);
		}
	);
	return finishDeviceSymbol(sym);
}

export function buildResistorUs(opts?: PassiveSymbolOpts): KicadElementSymbol {
	const libId = 'Device:R_US';
	const sym = beginDeviceSymbol(libId, { pinNameOffset: 0, hidePinNames: false });
	sym.addStandardLibraryProperties({
		reference: opts?.reference ?? 'R',
		value: opts?.value ?? 'R_US',
		footprint: opts?.footprint,
		datasheet: opts?.datasheet ?? '',
		description: 'Resistor, US symbol',
		keywords: 'R res resistor',
		fpFilters: 'R_*',
		refAt: { x: 2.54, y: 0, rot: 90 },
		valAt: { x: -2.54, y: 0, rot: 90 },
		footprintAt: { x: 1.016, y: -0.254, rot: 90 }
	});
	addUnitPair(
		sym,
		libId,
		body => {
			body.addChild(makePolyline([[0, -2.286], [0, -2.54]], 0));
			body.addChild(makePolyline([[0, 2.286], [0, 2.54]], 0));
			body.addChild(
				makePolyline(
					[
						[0, -0.762],
						[1.016, -1.143],
						[0, -1.524],
						[-1.016, -1.905],
						[0, -2.286]
					],
					0
				)
			);
			body.addChild(
				makePolyline(
					[
						[0, 0.762],
						[1.016, 0.381],
						[0, 0],
						[-1.016, -0.381],
						[0, -0.762]
					],
					0
				)
			);
			body.addChild(
				makePolyline(
					[
						[0, 2.286],
						[1.016, 1.905],
						[0, 1.524],
						[-1.016, 1.143],
						[0, 0.762]
					],
					0
				)
			);
		},
		pins => {
			pins.addChild(makePassivePin({ name: '', number: '1', x: 0, y: 3.81, rot: 270, length: 1.27 }));
			pins.addChild(makePassivePin({ name: '', number: '2', x: 0, y: -3.81, rot: 90, length: 1.27 }));
		}
	);
	return finishDeviceSymbol(sym);
}

export function buildCapacitorPolarizedUs(opts?: PassiveSymbolOpts): KicadElementSymbol {
	const libId = 'Device:C_Polarized_US';
	const sym = beginDeviceSymbol(libId, { pinNameOffset: 0.254, hidePinNames: false });
	sym.addStandardLibraryProperties({
		reference: opts?.reference ?? 'C',
		value: opts?.value ?? 'C_Polarized_US',
		footprint: opts?.footprint,
		datasheet: opts?.datasheet ?? '',
		description: 'Polarized capacitor, US symbol',
		keywords: 'cap capacitor',
		fpFilters: 'CP_*',
		refAt: { x: 0.635, y: 2.54 },
		valAt: { x: 0.635, y: -2.54 },
		refJustify: 'left',
		valJustify: 'left'
	});
	addUnitPair(
		sym,
		libId,
		body => {
			body.addChild(makePolyline([[-2.032, 0.762], [2.032, 0.762]], 0.508));
			body.addChild(makePolyline([[-1.778, 2.286], [-0.762, 2.286]], 0));
			body.addChild(makePolyline([[-1.27, 1.778], [-1.27, 2.794]], 0));
			body.addChild(makeArc(2.032, -1.27, 0, -0.5572, -2.032, -1.27, 0.508));
		},
		pins => {
			pins.addChild(makePassivePin({ name: '', number: '1', x: 0, y: 3.81, rot: 270, length: 2.794 }));
			pins.addChild(makePassivePin({ name: '', number: '2', x: 0, y: -3.81, rot: 90, length: 3.302 }));
		}
	);
	return finishDeviceSymbol(sym);
}

/** Map of libId → builder (no args → defaults matching the catalog). */
export const PASSIVE_SYMBOL_BUILDERS = {
	'Device:R': buildResistor,
	'Device:C': buildCapacitor,
	'Device:L': buildInductor,
	'Device:FerriteBead': buildFerriteBead,
	'Device:D': buildDiode,
	'Device:D_Schottky': buildSchottky,
	'Device:LED': buildLed,
	'Device:R_US': buildResistorUs,
	'Device:R_Potentiometer': buildPotentiometer,
	'Device:C_Polarized': buildCapacitorPolarized,
	'Device:C_Polarized_US': buildCapacitorPolarizedUs,
	'Device:D_Zener': buildZener,
	'Device:Crystal': buildCrystal,
	'Device:Fuse': buildFuse,
	'Device:D_TVS': buildTvs,
	'Device:Q_NMOS': buildNmos,
	'Device:Q_NPN': buildNpn,
	'Device:Q_PMOS': buildPmos,
	'Device:Q_PNP': buildPnp,
	'Device:Thermistor': buildThermistor,
	'Device:Thermistor_NTC': buildThermistorNtc,
	'power:GND': buildPowerGnd
} as const;
