import { KicadElementXY } from './KicadElementXY';

export class KicadElementEnd extends KicadElementXY {
	override name = 'end';

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