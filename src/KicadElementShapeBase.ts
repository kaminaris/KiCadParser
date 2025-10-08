import { KicadElement }                        from './KicadElement';
import { KicadElementFill, KicadFillType }     from './KicadElementFill';
import { KicadElementStroke, KicadStrokeType } from './KicadElementStroke';

/**
 * Elements that have stroke and fill properties inherit from this base class.
 */
export class KicadElementShapeBase extends KicadElement {
	setStroke(width: number, type: KicadStrokeType = 'default') {
		const str = this.findOrCreateChildByClass(KicadElementStroke);
		str.setWidth(width);
		str.setType(type);
	}

	getStroke(): { width: number, type: KicadStrokeType } {
		const str = this.findFirstChildByClass(KicadElementStroke);
		if (!str) {
			return { width: 0.2, type: 'default' }; // Default stroke
		}
		return { width: str.getWidth(), type: str.getType() };
	}

	setFill(type: KicadFillType) {
		let fill = this.findOrCreateChildByClass(KicadElementFill);
		fill.setType(type);
	}

	getFill(): KicadFillType {
		const fill = this.findFirstChildByClass(KicadElementFill);
		return fill?.getType() ?? 'none';
	}

	getFillColor(defaultColor = 'rgba(0,0,0,0)'): string {
		const fill = this.findFirstChildByClass(KicadElementFill);
		if (!fill) {
			return defaultColor;
		}
		switch (fill.getType()) {
			case 'none':
				return 'rgba(0,0,0,0)';
			case 'outline':
				return defaultColor;
			case 'background':
				return defaultColor;
			case 'color':
				return fill.getColor();
			default:
				return defaultColor;
		}
	}

	getStrokeColor(defaultColor = 'rgba(0,0,0,0)'): string {
		const stroke = this.findFirstChildByClass(KicadElementStroke);
		if (!stroke) {
			return defaultColor;
		}
		return stroke.getColor(defaultColor)
	}
}