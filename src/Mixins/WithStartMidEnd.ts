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
			if (startX !== undefined && startY !== undefined) {
				const s = new KicadElementStart(startX, startY);
				this.addChild(s);
			}

			if (midX !== undefined && midY !== undefined) {
				const m = new KicadElementMid(midX, midY);
				this.addChild(m);
			}

			if (endX !== undefined && endY !== undefined) {
				const e = new KicadElementEnd(endX, endY);
				this.addChild(e);
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

			const startAngle = Math.atan2(ay - centerY, ax - centerX);
			let endAngle = Math.atan2(cy - centerY, cx - centerX);

			// Only enforce clockwise direction for schematics (not symbols)
			if (!invert && endAngle > startAngle) {
				endAngle -= 2 * Math.PI;
			}

			return { centerX, centerY, radius, startAngle, endAngle };
		}
	};
}