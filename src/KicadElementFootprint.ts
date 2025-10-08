import { KicadElement }         from './KicadElement';
import { KicadElementProperty } from './KicadElementProperty';

export class KicadElementFootprint extends KicadElement {

	addBaselineProperties() {
		/**
		 * 	 (
		 *     property
		 *     "Reference"
		 *     "REF**"
		 *     (at 0 -0.5 0)
		 *     (unlocked yes)
		 *     (layer "F.SilkS")
		 *     (uuid "3e2208ca-86c2-4c25-bce2-a61be07f4e3a")
		 *     (effects (font (size 1 1) (thickness 0.1)))
		 *   )
		 */
		const refProp = new KicadElementProperty('Reference', 'REF**');
		refProp.setOrigin(0, -0.5);
		refProp.setUnlocked(true);
		refProp.setLayer('F.SilkS');
		refProp.addUuid();
		// refProp.setFont(1, 1, 0.1);

		/**
		 *   (
		 *     property
		 *     "Value"
		 *     "tess"
		 *     (at 0 1 0)
		 *     (unlocked yes)
		 *     (layer "F.Fab")
		 *     (uuid "9918a625-ae5a-4baa-8eea-664a78ccd8aa")
		 *     (effects (font (size 1 1) (thickness 0.15)))
		 *   )
		 */
		// const valueProp = new KicadElementProperty('Value', 'FootprintValue', 1, 0);
		// valueProp.effects.setFont(1, 1, 0.15);
		// valueProp.layer = 'F.Fab';

		/**
		 *   (
		 *     property
		 *     "Footprint"
		 *     ""
		 *     (at 0 0 0)
		 *     (unlocked yes)
		 *     (layer "F.Fab")
		 *     (hide yes)
		 *     (uuid "e0e75de8-f85c-4ec1-89ad-e4b5eb9938fd")
		 *     (effects (font (size 1 1) (thickness 0.15)))
		 *   )
		 */
		// const footprintProp = new KicadElementProperty('Footprint', '', 0, 0);
		// footprintProp.effects.setFont(1, 1, 0.15);
		// footprintProp.hidden = true;
		// footprintProp.layer = 'F.Fab';

		/**
		 *   (
		 *     property
		 *     "Datasheet"
		 *     ""
		 *     (at 0 0 0)
		 *     (unlocked yes)
		 *     (layer "F.Fab")
		 *     (hide yes)
		 *     (uuid "3bc806a3-cee5-47c0-ab9d-83de24fd718c")
		 *     (effects (font (size 1 1) (thickness 0.15)))
		 *   )
		 */
		// const datasheetProp = new KicadElementProperty('Datasheet', '', 0, 0);
		// datasheetProp.effects.setFont(1, 1, 0.15);
		// datasheetProp.hidden = true;
		// datasheetProp.layer = 'F.Fab';

		/**
		 *   (
		 *     property
		 *     "Description"
		 *     ""
		 *     (at 0 0 0)
		 *     (unlocked yes)
		 *     (layer "F.Fab")
		 *     (hide yes)
		 *     (uuid "07771bac-38f3-46b8-b06e-effad35b4fa3")
		 *     (effects (font (size 1 1) (thickness 0.15)))
		 *   )
		 */
		// const descriptionProp = new KicadElementProperty('Description', '', 0, 0);
		// descriptionProp.effects.setFont(1, 1, 0.15);
		// descriptionProp.hidden = true;
		// descriptionProp.layer = 'F.Fab';

		// this.properties.push(refProp);
		// this.properties.push(valueProp);
		// this.properties.push(footprintProp);
		// this.properties.push(datasheetProp);
		// this.properties.push(descriptionProp);
	}
}