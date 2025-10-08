import { KicadElementShapeBase }                               from './KicadElementShapeBase';
import { KicadElementEnd, KicadElementMid, KicadElementStart } from './KicadElementXY';

/**
 * (arc
 * 	(start -2.032 -1.27)
 * 	(mid 0 -0.5572)
 * 	(end 2.032 -1.27)
 * 	(stroke (width 0.508) (type default))
 * 	(fill (type none))
 * )
 */
export class KicadElementArc extends KicadElementShapeBase {
	override name = 'arc';

	constructor(
		startX?: number,
		startY?: number,
		midX?: number,
		midY?: number,
		endX?: number,
		endY?: number
	) {
		super();

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

	getRadius() {
		const { start, mid } = this.getStartMidEnd();
		return Math.hypot(start.x - mid.x, start.y - mid.y);
	}

	getArcCenterRadiusAngles5(invert = false) {
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


	getArcCenterRadiusAngles4(invert = false) {
		const { start, mid, end } = this.getStartMidEnd();

		// Calculate the center from three points on the arc

		// const startX = arcData.start.x * -1;
		// const startY = arcData.start.y;
		// const midX = arcData.mid.x * -1;
		// const midY = arcData.mid.y;
		// const endX = arcData.end.x * -1;
		// const endY = arcData.end.y;

		const ax = start.x;
		const ay = invert ? start.y * -1 : start.y;
		const bx = mid.x;
		const by = mid.y;
		const cx = end.x;
		const cy = invert ? end.y * -1 : end.y;

		// Calculate the perpendicular bisectors
		const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));

		if (Math.abs(d) < 1e-10) {
			throw new Error('Points are collinear, cannot form an arc');
		}

		const centerX = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay
			- by)) / d;
		const centerY = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx
			- ax)) / d;

		const radius = Math.hypot(start.x - centerX, start.y - centerY);

		const startAngle = Math.atan2(start.y - centerY, start.x - centerX);
		let endAngle = Math.atan2(end.y - centerY, end.x - centerX);

		// Ensure clockwise direction
		if (endAngle > startAngle) {
			endAngle -= 2 * Math.PI;
		}

		return { centerX, centerY, radius, startAngle, endAngle };

	}

	getArcCenterRadiusAngles(invertMid = false) {
		const arcData = this.getStartMidEnd();

		const startX = arcData.start.x * -1;
		const startY = arcData.start.y;
		const midX = arcData.mid.x * -1;
		const midY = arcData.mid.y;
		const endX = arcData.end.x * -1;
		const endY = arcData.end.y;

		// Calculate the center from three points on the arc
		const centerX = ((startX * startX + startY * startY) * (endY - midY) +
				(midX * midX + midY * midY) * (startY - endY) +
				(endX * endX + endY * endY) * (midY - startY)) /
			(2 * (startX * (endY - midY) + midX * (startY - endY) + endX * (midY - startY)));

		const centerY = ((startX * startX + startY * startY) * (endX - midX) +
				(midX * midX + midY * midY) * (startX - endX) +
				(endX * endX + endY * endY) * (midX - startX)) /
			(2 * (startY * (endX - midX) + midY * (startX - endX) + endY * (midX - startX)));

		const radius = Math.hypot(startX - centerX, startY - centerY);
		const startAngle = Math.atan2(startY - centerY, startX - centerX);
		const endAngle = Math.atan2(endY - centerY, endX - centerX);

		return { centerX, centerY, radius, startAngle, endAngle };
	}
}