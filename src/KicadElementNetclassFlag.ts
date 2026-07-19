import { WithOrigin }     from './Mixins/WithOrigin';
import { WithProperties } from './Mixins/WithProperties';
import { WithUUID }       from './Mixins/WithUUID';
import { KicadElement }   from './KicadElement';

/**
 * (netclass_flag ""
 * 		(length 2.54)
 * 		(shape round)
 * 		(at 173.99 66.04 0)
 * 		(fields_autoplaced yes)
 * 		(effects (font (size 1.27 1.27)) (justify left bottom))
 * 		(uuid "37a0b1d0-2768-4338-b08b-0cb85263fe5d")
 * 		(property "Netclass" "" (at -46.99 -8.89 0) ...)
 * )
 */
export class KicadElementNetclassFlag extends WithUUID(WithOrigin(WithProperties(KicadElement))) {
	override name = 'netclass_flag';

	getNetclassName(): string {
		return this.getPropertyByName('Netclass')?.propertyValue ?? '';
	}
}
