import { WithOrigin }   from './Mixins/WithOrigin';
import { KicadElement } from './KicadElement';

export class KicadElementNoConnect extends WithOrigin(KicadElement) {
	override name = 'no_connect';
}