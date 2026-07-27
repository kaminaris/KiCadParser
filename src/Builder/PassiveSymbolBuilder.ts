/**
 * Programmatic KiCad Device:* / power:* library-symbol builders.
 * Truth-aligned Device:* geometry comes from {@link ../Catalog/DeviceSymbolSpecs}
 * (extracted from examples/sample-data/basic.kicad_sch).
 */

export { buildDeviceSymbolFromSpec } from './PassiveSymbolFromSpec';
export * from './PassiveSymbolManualVariants';
export { makePassivePin, type PassivePinOpts } from './PassiveSymbolPrimitives';
export * from './PassiveSymbolRegistry';
export * from './PassiveSymbolTypes';
