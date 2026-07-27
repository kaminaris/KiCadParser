import type { PassiveBuilder, PassiveSymbolOpts } from './PassiveSymbolTypes';
import { buildFromCatalog, type SpecLibId } from './PassiveSymbolFromSpec';
import {
	buildCapacitorPolarizedUs,
	buildPowerGnd,
	buildResistorUs
} from './PassiveSymbolManualVariants';

export type PassiveSymbolLibId = SpecLibId | 'Device:R_US' | 'Device:C_Polarized_US' | 'power:GND';

function makeCatalogBuilder(libId: SpecLibId): PassiveBuilder {
	return (opts?: PassiveSymbolOpts) => buildFromCatalog(libId, opts);
}

export const buildResistor = makeCatalogBuilder('Device:R');
export const buildCapacitor = makeCatalogBuilder('Device:C');
export const buildInductor = makeCatalogBuilder('Device:L');
export const buildFerriteBead = makeCatalogBuilder('Device:FerriteBead');
export const buildDiode = makeCatalogBuilder('Device:D');
export const buildSchottky = makeCatalogBuilder('Device:D_Schottky');
export const buildLed = makeCatalogBuilder('Device:LED');
export const buildPotentiometer = makeCatalogBuilder('Device:R_Potentiometer');
export const buildCapacitorPolarized = makeCatalogBuilder('Device:C_Polarized');
export const buildZener = makeCatalogBuilder('Device:D_Zener');
export const buildCrystal = makeCatalogBuilder('Device:Crystal');
export const buildFuse = makeCatalogBuilder('Device:Fuse');
export const buildTvs = makeCatalogBuilder('Device:D_TVS');
export const buildNmos = makeCatalogBuilder('Device:Q_NMOS');
export const buildNpn = makeCatalogBuilder('Device:Q_NPN');
export const buildPmos = makeCatalogBuilder('Device:Q_PMOS');
export const buildPnp = makeCatalogBuilder('Device:Q_PNP');
export const buildThermistor = makeCatalogBuilder('Device:Thermistor');
export const buildThermistorNtc = makeCatalogBuilder('Device:Thermistor_NTC');

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
} satisfies Record<PassiveSymbolLibId, PassiveBuilder>;
