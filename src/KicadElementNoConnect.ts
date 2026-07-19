import { WithOrigin }   from './Mixins/WithOrigin';
import { WithUUID }     from './Mixins/WithUUID';
import { KicadElement } from './KicadElement';

export class KicadElementNoConnect extends WithUUID(WithOrigin(KicadElement)) {
	override name = 'no_connect';
}