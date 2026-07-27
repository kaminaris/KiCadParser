import { KicadElementSymbol } from '../KicadElementSymbol';

export function unitSymbolName(libId: string, suffix: string): string {
	const short = libId.includes(':') ? libId.slice(libId.indexOf(':') + 1) : libId;
	return `${short}_${suffix}`;
}

export function beginDeviceSymbol(
	libId: string,
	pinNameOffset: number,
	hidePinNames?: boolean,
	hidePinNumbers?: boolean
): KicadElementSymbol {
	const sym = new KicadElementSymbol(libId);
	if (hidePinNumbers !== false) {
		sym.togglePinNumbers(false);
	}
	if (hidePinNames) {
		sym.togglePinNames(false, pinNameOffset);
	}
	else {
		sym.setPinNameOffset(pinNameOffset);
	}
	sym.setExcludeFromSim(false);
	sym.setInBom(true).setOnBoard(true);
	sym.setInPosFiles(true);
	sym.setDuplicatePinNumbersAreJumpers(false);
	return sym;
}

export function finishDeviceSymbol(sym: KicadElementSymbol): KicadElementSymbol {
	sym.setEmbeddedFonts(false);
	return sym;
}

export function addUnitPair(
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
