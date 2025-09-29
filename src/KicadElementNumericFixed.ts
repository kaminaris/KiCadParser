import { KicadElementNumeric } from './KicadElementNumeric';

export abstract class KicadElementNumericFixed extends KicadElementNumeric {
	precision = 6;

	override write(): string {
		return this.pad() + `(${ this.name } ${ this.value.toFixed(this.precision) })`;
	}
}

export class KicadElementDashedLineDashRatio extends KicadElementNumericFixed {
	override name = 'dashed_line_dash_ratio';
}

export class KicadElementDashedLineGapRatio extends KicadElementNumericFixed {
	override name = 'dashed_line_gap_ratio';
}

export class KicadElementHpglPenDiameter extends KicadElementNumericFixed {
	override name = 'hpglpendiameter';
}