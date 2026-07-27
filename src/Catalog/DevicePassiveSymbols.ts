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
	type PassiveSymbolLibId
} from '../Builder/PassiveSymbolBuilder';

/** Preferred name for catalog lib ids (Device:* + power:*). */
export type DeviceLibId = PassiveSymbolLibId;

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

export const PASSIVE_LIB_BY_ID: Record<DeviceLibId, string> = Object.fromEntries(
	(Object.entries(PASSIVE_SYMBOL_BUILDERS) as Array<[DeviceLibId, () => { write(): string }]>).map(
		([libId, builder]) => [libId, writeSymbol(builder)]
	)
) as Record<DeviceLibId, string>;

export const PASSIVE_SYMBOL_R = PASSIVE_LIB_BY_ID['Device:R'];
export const PASSIVE_SYMBOL_C = PASSIVE_LIB_BY_ID['Device:C'];
export const PASSIVE_SYMBOL_L = PASSIVE_LIB_BY_ID['Device:L'];
export const PASSIVE_SYMBOL_FERRITE = PASSIVE_LIB_BY_ID['Device:FerriteBead'];
export const PASSIVE_SYMBOL_D = PASSIVE_LIB_BY_ID['Device:D'];
export const PASSIVE_SYMBOL_D_SCHOTTKY = PASSIVE_LIB_BY_ID['Device:D_Schottky'];
export const PASSIVE_SYMBOL_LED = PASSIVE_LIB_BY_ID['Device:LED'];
export const POWER_SYMBOL_GND = PASSIVE_LIB_BY_ID['power:GND'];
export const PASSIVE_SYMBOL_R_US = PASSIVE_LIB_BY_ID['Device:R_US'];
export const PASSIVE_SYMBOL_R_POT = PASSIVE_LIB_BY_ID['Device:R_Potentiometer'];
export const PASSIVE_SYMBOL_C_POL = PASSIVE_LIB_BY_ID['Device:C_Polarized'];
export const PASSIVE_SYMBOL_C_POL_US = PASSIVE_LIB_BY_ID['Device:C_Polarized_US'];
export const PASSIVE_SYMBOL_D_ZENER = PASSIVE_LIB_BY_ID['Device:D_Zener'];
export const PASSIVE_SYMBOL_CRYSTAL = PASSIVE_LIB_BY_ID['Device:Crystal'];
export const PASSIVE_SYMBOL_FUSE = PASSIVE_LIB_BY_ID['Device:Fuse'];
export const PASSIVE_SYMBOL_D_TVS = PASSIVE_LIB_BY_ID['Device:D_TVS'];
export const PASSIVE_SYMBOL_Q_NMOS = PASSIVE_LIB_BY_ID['Device:Q_NMOS'];
export const PASSIVE_SYMBOL_Q_NPN = PASSIVE_LIB_BY_ID['Device:Q_NPN'];
export const PASSIVE_SYMBOL_Q_PMOS = PASSIVE_LIB_BY_ID['Device:Q_PMOS'];
export const PASSIVE_SYMBOL_Q_PNP = PASSIVE_LIB_BY_ID['Device:Q_PNP'];
export const PASSIVE_SYMBOL_THERMISTOR = PASSIVE_LIB_BY_ID['Device:Thermistor'];
export const PASSIVE_SYMBOL_THERMISTOR_NTC = PASSIVE_LIB_BY_ID['Device:Thermistor_NTC'];

/** Inner `(symbol …)` sexpr for a catalog lib id. */
export function devicePassiveSymbol(libId: DeviceLibId): string {
	return PASSIVE_SYMBOL_BUILDERS[libId as keyof typeof PASSIVE_SYMBOL_BUILDERS]().write().trim();
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
