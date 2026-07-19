import { WithProperties } from './Mixins/WithProperties';
import { WithUUID }       from './Mixins/WithUUID';
import { KicadElement }   from './KicadElement';

export class KicadElementSheet extends WithUUID(WithProperties(KicadElement)) {
	override name = 'sheet';
}