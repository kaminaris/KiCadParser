import { WithProperties } from './Mixins/WithProperties';
import { KicadElement }   from './KicadElement';

export class KicadElementSheet extends WithProperties(KicadElement) {
	override name = 'sheet';
}