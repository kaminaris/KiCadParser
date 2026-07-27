/**
 * Canonical KiCad Device:* / power:* library symbols shared by API circuit-design
 * emit and web BOM clipboard paste.
 *
 * Entries are the inner `(symbol "Lib:Id" …)` form. Use
 * {@link devicePassiveLibSymbols} when you need a pasteable `(lib_symbols …)` block.
 *
 * Symbols are built programmatically via {@link ../Builder/PassiveSymbolBuilder}.
 */

import {
	PASSIVE_SYMBOL_BUILDERS,
	buildResistor,
	buildCapacitor,
	buildInductor,
	buildFerriteBead,
	buildDiode,
	buildSchottky,
	buildLed,
	buildPowerGnd,
	buildResistorUs,
	buildPotentiometer,
	buildCapacitorPolarized,
	buildCapacitorPolarizedUs,
	buildZener,
	buildCrystal,
	buildFuse,
	buildTvs,
	buildNmos,
	buildNpn,
	buildPmos,
	buildPnp,
	buildThermistor,
	buildThermistorNtc
} from '../Builder/PassiveSymbolBuilder';

/** Preferred name for catalog lib ids (Device:* + power:*). */
export type DeviceLibId =
	| 'Device:R'
	| 'Device:C'
	| 'Device:L'
	| 'Device:FerriteBead'
	| 'Device:D'
	| 'Device:D_Schottky'
	| 'Device:LED'
	| 'Device:R_US'
	| 'Device:R_Potentiometer'
	| 'Device:C_Polarized'
	| 'Device:C_Polarized_US'
	| 'Device:D_Zener'
	| 'Device:Crystal'
	| 'Device:Fuse'
	| 'Device:D_TVS'
	| 'Device:Q_NMOS'
	| 'Device:Q_NPN'
	| 'Device:Q_PMOS'
	| 'Device:Q_PNP'
	| 'Device:Thermistor'
	| 'Device:Thermistor_NTC'
	| 'power:GND';

/** @deprecated Prefer {@link DeviceLibId}. */
export type PassiveLibId = DeviceLibId;

/** Circuit-design subset (no BOM-only variants). */
export type CircuitDesignPassiveLibId =
	| 'Device:R'
	| 'Device:C'
	| 'Device:L'
	| 'Device:FerriteBead'
	| 'Device:D'
	| 'Device:D_Schottky'
	| 'Device:LED'
	| 'power:GND';

function writeSymbol(builder: () => { write(): string }): string {
	return builder().write().trim();
}

export const PASSIVE_SYMBOL_R = writeSymbol(buildResistor);
export const PASSIVE_SYMBOL_C = writeSymbol(buildCapacitor);
export const PASSIVE_SYMBOL_L = writeSymbol(buildInductor);
export const PASSIVE_SYMBOL_FERRITE = writeSymbol(buildFerriteBead);
export const PASSIVE_SYMBOL_D = writeSymbol(buildDiode);
export const PASSIVE_SYMBOL_D_SCHOTTKY = writeSymbol(buildSchottky);
export const PASSIVE_SYMBOL_LED = writeSymbol(buildLed);
export const POWER_SYMBOL_GND = writeSymbol(buildPowerGnd);
export const PASSIVE_SYMBOL_R_US = writeSymbol(buildResistorUs);
export const PASSIVE_SYMBOL_R_POT = writeSymbol(buildPotentiometer);
export const PASSIVE_SYMBOL_C_POL = writeSymbol(buildCapacitorPolarized);
export const PASSIVE_SYMBOL_C_POL_US = writeSymbol(buildCapacitorPolarizedUs);
export const PASSIVE_SYMBOL_D_ZENER = writeSymbol(buildZener);
export const PASSIVE_SYMBOL_CRYSTAL = writeSymbol(buildCrystal);
export const PASSIVE_SYMBOL_FUSE = writeSymbol(buildFuse);
export const PASSIVE_SYMBOL_D_TVS = writeSymbol(buildTvs);
export const PASSIVE_SYMBOL_Q_NMOS = writeSymbol(buildNmos);
export const PASSIVE_SYMBOL_Q_NPN = writeSymbol(buildNpn);
export const PASSIVE_SYMBOL_Q_PMOS = writeSymbol(buildPmos);
export const PASSIVE_SYMBOL_Q_PNP = writeSymbol(buildPnp);
export const PASSIVE_SYMBOL_THERMISTOR = writeSymbol(buildThermistor);
export const PASSIVE_SYMBOL_THERMISTOR_NTC = writeSymbol(buildThermistorNtc);

export const PASSIVE_LIB_BY_ID: Record<DeviceLibId, string> = {
	'Device:R': PASSIVE_SYMBOL_R,
	'Device:C': PASSIVE_SYMBOL_C,
	'Device:L': PASSIVE_SYMBOL_L,
	'Device:FerriteBead': PASSIVE_SYMBOL_FERRITE,
	'Device:D': PASSIVE_SYMBOL_D,
	'Device:D_Schottky': PASSIVE_SYMBOL_D_SCHOTTKY,
	'Device:LED': PASSIVE_SYMBOL_LED,
	'Device:R_US': PASSIVE_SYMBOL_R_US,
	'Device:R_Potentiometer': PASSIVE_SYMBOL_R_POT,
	'Device:C_Polarized': PASSIVE_SYMBOL_C_POL,
	'Device:C_Polarized_US': PASSIVE_SYMBOL_C_POL_US,
	'Device:D_Zener': PASSIVE_SYMBOL_D_ZENER,
	'Device:Crystal': PASSIVE_SYMBOL_CRYSTAL,
	'Device:Fuse': PASSIVE_SYMBOL_FUSE,
	'Device:D_TVS': PASSIVE_SYMBOL_D_TVS,
	'Device:Q_NMOS': PASSIVE_SYMBOL_Q_NMOS,
	'Device:Q_NPN': PASSIVE_SYMBOL_Q_NPN,
	'Device:Q_PMOS': PASSIVE_SYMBOL_Q_PMOS,
	'Device:Q_PNP': PASSIVE_SYMBOL_Q_PNP,
	'Device:Thermistor': PASSIVE_SYMBOL_THERMISTOR,
	'Device:Thermistor_NTC': PASSIVE_SYMBOL_THERMISTOR_NTC,
	'power:GND': POWER_SYMBOL_GND
};

/** Inner `(symbol …)` sexpr for a catalog lib id. */
export function devicePassiveSymbol(libId: DeviceLibId): string {
	return PASSIVE_SYMBOL_BUILDERS[libId]().write().trim();
}

/** Pasteable `(lib_symbols …)` wrapper used by BOM clipboard. */
export function devicePassiveLibSymbols(libId: DeviceLibId): string {
	const inner = devicePassiveSymbol(libId);
	const indented = inner
		.split('\n')
		.map(line => '  ' + line)
		.join('\n');
	return '(lib_symbols\n' + indented + '\n)\n';
}

/** Default local pin positions for Device:* 2-pin vertical symbols. */
export const VERTICAL_2PIN: Array<{ number: string; x: number; y: number; rotation: number }> = [
	{ number: '1', x: 0, y: 3.81, rotation: 270 },
	{ number: '2', x: 0, y: -3.81, rotation: 90 }
];

/** Device:D / Schottky / LED / Zener — pin 1 = K (left), pin 2 = A (right). */
export const HORIZONTAL_DIODE_PINS: Array<{ number: string; x: number; y: number; rotation: number }> = [
	{ number: '1', x: -3.81, y: 0, rotation: 0 },
	{ number: '2', x: 3.81, y: 0, rotation: 180 }
];
