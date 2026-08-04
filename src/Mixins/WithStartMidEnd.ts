import { Ctor }                                                from './Ctor';
import { KicadElementEnd, KicadElementMid, KicadElementStart } from '../KicadElementXY';
import { KicadElement }                                        from '../KicadElement';

export function WithStartMidEnd<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		setStartMidEnd(
			startX?: number,
			startY?: number,
			midX?: number,
			midY?: number,
			endX?: number,
			endY?: number
		) {
			// find-or-create, not addChild: callers (e.g. a live drag) may call
			// this repeatedly on the same instance — addChild unconditionally
			// would accumulate duplicate Start/Mid/End children on every call.
			if (startX !== undefined && startY !== undefined) {
				const s = this.findOrCreateChildByClass(KicadElementStart);
				s.x = startX;
				s.y = startY;
			}

			if (midX !== undefined && midY !== undefined) {
				const m = this.findOrCreateChildByClass(KicadElementMid);
				m.x = midX;
				m.y = midY;
			}

			if (endX !== undefined && endY !== undefined) {
				const e = this.findOrCreateChildByClass(KicadElementEnd);
				e.x = endX;
				e.y = endY;
			}
		}

		getStartMidEnd(): {
			start: { x: number, y: number },
			mid: { x: number, y: number },
			end: { x: number, y: number }
		} {
			const start = this.findFirstChildByClass(KicadElementStart);
			const mid = this.findFirstChildByClass(KicadElementMid);
			const end = this.findFirstChildByClass(KicadElementEnd);
			return {
				start: { x: start?.x ?? 0, y: start?.y ?? 0 },
				mid: { x: mid?.x ?? 0, y: mid?.y ?? 0 },
				end: { x: end?.x ?? 0, y: end?.y ?? 0 }
			};
		}

		getArcCenterRadiusAngles(invert = false) {
			const { start, mid, end } = this.getStartMidEnd();

			// For symbols: flip X coordinates
			// For schematics: use original coordinates
			const ax = invert ? start.x * -1 : start.x;
			const ay = start.y;
			const bx = invert ? mid.x * -1 : mid.x;
			const by = mid.y;
			const cx = invert ? end.x * -1 : end.x;
			const cy = end.y;

			// Calculate the center from three points on the arc
			const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));

			if (Math.abs(d) < 1e-10) {
				throw new Error('Points are collinear, cannot form an arc');
			}

			const centerX = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
			const centerY = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;

			const radius = Math.hypot(ax - centerX, ay - centerY);

			const angleOf = (x: number, y: number) => Math.atan2(y - centerY, x - centerX);
			const rawStartAngle = angleOf(ax, ay);
			const rawMidAngle = angleOf(bx, by);
			const rawEndAngle = angleOf(cx, cy);

			// Two arcs connect start to end; only one of them actually passes
			// through mid. The renderer always sweeps FORWARD (increasing
			// angle — schematic/board space is Y-down, so increasing angle is
			// clockwise on screen, matching canvas's own default arc()
			// direction), so pick whichever of {start→end, end→start} — as a
			// forward sweep — reaches mid before it reaches its own opposite
			// endpoint.
			//
			// A previous version picked direction from a fixed "assume
			// clockwise, subtract 2π if end > start" rule using only
			// start/end, never checking mid at all. For a half-circle (180°)
			// arc specifically this is a real coin-flip: the correct arc and
			// its exact opposite (bulging the other way) both connect the
			// same two endpoints, and the old rule picked whichever one
			// start/end's raw atan2 values happened to produce — confirmed
			// via a real symbol with two mirror-image 180° arcs where one
			// rendered correctly and the other rendered as if rotated 180°.
			const normalize = (a: number) => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
			const forward = (from: number, to: number) => normalize(to - from);

			const forwardStartToMid = forward(rawStartAngle, rawMidAngle);
			const forwardStartToEnd = forward(rawStartAngle, rawEndAngle);

			let startAngle: number;
			let endAngle: number;
			if (forwardStartToMid < forwardStartToEnd) {
				// The forward sweep from start already reaches mid before end.
				startAngle = rawStartAngle;
				endAngle = rawStartAngle + forwardStartToEnd;
			}
			else {
				// It doesn't — the correct arc is the complementary one, drawn
				// as a forward sweep starting from `end` instead (the shape
				// drawn is identical either way; only which literal endpoint
				// is labeled "start" changes, which nothing downstream relies
				// on for correctness, only for sweep direction).
				startAngle = rawEndAngle;
				endAngle = rawEndAngle + (2 * Math.PI - forwardStartToEnd);
			}

			return { centerX, centerY, radius, startAngle, endAngle };
		}
	};
}