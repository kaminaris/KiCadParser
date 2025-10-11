import { WithOrigin }   from './Mixins/WithOrigin';
import { KicadElement } from './KicadElement';

export class KicadElementJunction extends WithOrigin(KicadElement) {
	override name = 'junction';
}