import type { KicadFillType } from '../KicadElementFill';
import type { KicadPinElectricalType, KicadPinShape } from '../KicadElementPin';
import type { KicadStrokeType } from '../KicadElementStroke';
import type { KicadJustifyHorizontal, KicadJustifyVertical } from '../KicadElementJustify';

export type DeviceGraphic =
	| { t: 'pl'; pts: Array<[number, number]>; w: number; st?: KicadStrokeType; fill?: KicadFillType }
	| { t: 'rect'; s: [number, number]; e: [number, number]; w: number; st?: KicadStrokeType; fill?: KicadFillType }
	| { t: 'arc'; s: [number, number]; m: [number, number]; e: [number, number]; w: number }
	| { t: 'cir'; c: [number, number]; r: number; w: number; fill?: KicadFillType }
	| { t: 'pin'; et: KicadPinElectricalType; sh: KicadPinShape; at: [number, number, number]; len: number; name: string; num: string; hidden?: boolean };

export type DevicePropSpec = {
	name: string;
	value: string;
	at: { x: number; y: number; rot?: number };
	hide?: boolean;
	justifyH?: KicadJustifyHorizontal;
	justifyV?: KicadJustifyVertical;
};

export type DeviceSymbolSpec = {
	hasPinNumbers: boolean;
	pinNumbersHide: boolean;
	pinNamesOffset: number;
	pinNamesHide: boolean;
	props: DevicePropSpec[];
	units: Array<{ name: string; graphics: DeviceGraphic[] }>;
};
