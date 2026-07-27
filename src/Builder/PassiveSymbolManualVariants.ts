import { KicadElement } from '../KicadElement';
import { KicadElementSymbol } from '../KicadElementSymbol';
import { addUnitPair, beginDeviceSymbol, finishDeviceSymbol } from './PassiveSymbolCore';
import { makeArc, makePassivePin, makePolyline } from './PassiveSymbolPrimitives';
import type { PassiveSymbolOpts } from './PassiveSymbolTypes';

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
	const sym = beginDeviceSymbol(libId, 0, false);
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
	const sym = beginDeviceSymbol(libId, 0.254, false);
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
