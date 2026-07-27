import { KicadElementArc } from '../KicadElementArc';
import { KicadElementCircle } from '../KicadElementCircle';
import { KicadElementEffects } from '../KicadElementEffects';
import type { KicadFillType } from '../KicadElementFill';
import { KicadElement } from '../KicadElement';
import { KicadElementName } from '../KicadElementName';
import { KicadElementNumber } from '../KicadElementNumber';
import {
	KicadElementPin,
	type KicadPinElectricalType,
	type KicadPinShape
} from '../KicadElementPin';
import { KicadElementPolyline } from '../KicadElementPolyline';
import { KicadElementRectangle } from '../KicadElementStartEnd';
import type { KicadStrokeType } from '../KicadElementStroke';

export type PassivePinOpts = {
	name: string;
	number: string;
	x: number;
	y: number;
	rot: number;
	length: number;
	electricalType?: KicadPinElectricalType;
	shape?: KicadPinShape;
	hidden?: boolean;
};

const FONT = 1.27;

function setLabelFont(el: KicadElement): void {
	const effects = el.findOrCreateChildByClass(KicadElementEffects);
	effects.setFont(FONT, FONT);
}

export function makePassivePin(opts: PassivePinOpts): KicadElementPin {
	const pin = new KicadElementPin();
	pin.setType(opts.electricalType ?? 'passive', opts.shape ?? 'line');
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

export function makePolyline(
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

export function makeArc(
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

export function makeRect(
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

export function makeCircle(
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
