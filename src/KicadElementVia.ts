import { WithDrill }    from './Mixins/WithDrill';
import { WithLayerColor } from './Mixins/WithLayerColor';
import { WithLayers }   from './Mixins/WithLayers';
import { WithOrigin }   from './Mixins/WithOrigin';
import { WithSize }     from './Mixins/WithSize';
import { KicadElement } from './KicadElement';

/**
 * 	(via
 * 		(at 0 0)
 * 		(size 0.6)
 * 		(drill 0.3)
 * 		(layers "F.Cu" "B.Cu")
 * 		(net 1)
 * 		(uuid "d5f1c43f-4596-4bdc-96cb-75d477aee2df")
 * 	)
 */
export class KicadElementVia extends WithSize(WithOrigin(WithDrill(WithLayers(WithLayerColor(KicadElement))))) {
	override name = 'via';
}