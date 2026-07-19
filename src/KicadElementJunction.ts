import { WithOrigin }   from './Mixins/WithOrigin';
import { WithUUID }     from './Mixins/WithUUID';
import { KicadElement } from './KicadElement';

export class KicadElementJunction extends WithUUID(WithOrigin(KicadElement)) {
	override name = 'junction';
}