import { KicadElementXY } from './KicadElementXY';

export class KicadElementStart extends KicadElementXY {
	override name = 'start';

	constructor(x?: number, y?: number) {
		super();
		if (x !== undefined) {
			this.x = x;
		}
		if (y !== undefined) {
			this.y = y;
		}
	}
}