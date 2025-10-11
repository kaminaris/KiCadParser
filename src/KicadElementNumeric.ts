import { KicadElement } from './KicadElement';

export abstract class KicadElementNumeric extends KicadElement {
	value: number = 0;

	constructor(v?: number) {
		super();
		if (v !== undefined) {
			this.value = v;
		}
	}

	override afterParse() {
		if (this.attributes.length !== 1) {
			throw new Error(`${ this.name } expects exactly one attribute, got ${ this.attributes.length }`);
		}

		this.value = this.attributes[0].value as number;
		this.attributes.length = 0;
	}

	override write(): string {
		return this.pad() + `(${ this.name } ${ this.value })`;
	}
}

export class KicadElementWidth extends KicadElementNumeric {
	override name = 'width';
}

export class KicadElementDiameter extends KicadElementNumeric {
	override name = 'diameter';
}

export class KicadElementRadius extends KicadElementNumeric {
	override name = 'radius';
}

export class KicadElementThickness extends KicadElementNumeric {
	override name = 'thickness';
}

export class KicadElementMinThickness extends KicadElementNumeric {
	override name = 'min_thickness';
}

export class KicadElementThermalGap extends KicadElementNumeric {
	override name = 'thermal_gap';
}

export class KicadElementThermalBridgeWidth extends KicadElementNumeric {
	override name = 'thermal_bridge_width';
}

export class KicadElementIslandRemovalMode extends KicadElementNumeric {
	override name = 'island_removal_mode';
}

export class KicadElementIslandAreaMin extends KicadElementNumeric {
	override name = 'island_area_min';
}

export class KicadElementVersion extends KicadElementNumeric {
	override name = 'version';
}

export class KicadElementUnit extends KicadElementNumeric {
	override name = 'unit';
}

export class KicadElementLength extends KicadElementNumeric {
	override name = 'length';
}