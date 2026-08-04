import { WithPts }      from './Mixins/WithPts';
import { WithStroke }   from './Mixins/WithStroke';
import { WithUUID }     from './Mixins/WithUUID';
import { KicadElement } from './KicadElement';

/**
 * (wire (pts (xy 0 0) (xy 10 0)) (stroke (width 0) (type default)) (uuid "..."))
 */
export class KicadElementWire extends WithUUID(WithStroke(WithPts(KicadElement))) {
	override name = 'wire';
}