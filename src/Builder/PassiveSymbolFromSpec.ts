import { DEVICE_SYMBOL_SPECS } from '../Catalog/DeviceSymbolSpecs';
import type { DeviceGraphic, DeviceSymbolSpec } from '../Catalog/DeviceSymbolSpecTypes';
import { KicadElementSymbol } from '../KicadElementSymbol';
import { beginDeviceSymbol, finishDeviceSymbol } from './PassiveSymbolCore';
import {
	makeArc,
	makeCircle,
	makePassivePin,
	makePolyline,
	makeRect
} from './PassiveSymbolPrimitives';
import type { PassiveSymbolOpts } from './PassiveSymbolTypes';

export type SpecLibId = keyof typeof DEVICE_SYMBOL_SPECS;

type OverridablePropertyName = 'Reference' | 'Value' | 'Footprint' | 'Datasheet';

function isOverridablePropertyName(name: string): name is OverridablePropertyName {
	return name === 'Reference' || name === 'Value' || name === 'Footprint' || name === 'Datasheet';
}

function resolvePropertyValue(name: string, defaultValue: string, opts?: PassiveSymbolOpts): string {
	const overrides: Record<OverridablePropertyName, string | undefined> = {
		Reference: opts?.reference,
		Value: opts?.value,
		Footprint: opts?.footprint,
		Datasheet: opts?.datasheet
	};
	if (!isOverridablePropertyName(name)) {
		return defaultValue;
	}
	return overrides[name] ?? defaultValue;
}

function assertNever(value: never): never {
	throw new Error(`Unsupported DeviceGraphic variant: ${JSON.stringify(value)}`);
}

function applyGraphic(unit: KicadElementSymbol, g: DeviceGraphic): void {
	switch (g.t) {
		case 'pl':
			unit.addChild(makePolyline(g.pts, g.w, g.fill ?? 'none', g.st ?? 'default'));
			return;
		case 'rect':
			unit.addChild(makeRect(g.s[0], g.s[1], g.e[0], g.e[1], g.w, g.fill ?? 'none', g.st ?? 'default'));
			return;
		case 'arc':
			unit.addChild(makeArc(g.s[0], g.s[1], g.m[0], g.m[1], g.e[0], g.e[1], g.w));
			return;
		case 'cir':
			unit.addChild(makeCircle(g.c[0], g.c[1], g.r, g.w, g.fill ?? 'none'));
			return;
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
					shape: g.sh,
					hidden: g.hidden
				})
			);
			return;
	}
	assertNever(g);
}

/**
 * Materialize a Device:* library symbol from a truth-extracted spec.
 */
export function buildDeviceSymbolFromSpec(
	libId: SpecLibId,
	spec: DeviceSymbolSpec,
	opts?: PassiveSymbolOpts
): KicadElementSymbol {
	const sym = beginDeviceSymbol(
		libId,
		spec.pinNamesOffset,
		spec.pinNamesHide,
		spec.hasPinNumbers && spec.pinNumbersHide
	);

	for (const prop of spec.props) {
		const value = resolvePropertyValue(prop.name, prop.value, opts);
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

export function buildFromCatalog(libId: SpecLibId, opts?: PassiveSymbolOpts): KicadElementSymbol {
	return buildDeviceSymbolFromSpec(libId, DEVICE_SYMBOL_SPECS[libId], opts);
}
