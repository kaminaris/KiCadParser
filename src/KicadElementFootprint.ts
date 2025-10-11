import { WithLayer }            from './Mixins/WithLayer';
import { WithLayerColor }       from './Mixins/WithLayerColor';
import { WithOrigin }           from './Mixins/WithOrigin';
import { WithProperties }       from './Mixins/WithProperties';
import { KicadElement }         from './KicadElement';
import { KicadElementProperty } from './KicadElementProperty';

/**
 * (footprint "Button_Switch_THT:KSA_Tactile_SPST"
 * 		(layer "F.Cu")
 * 		(uuid "a0cfde01-1011-42ea-8b8c-0739dc83204a")
 * 		(at 80.5 63.75)
 * 		(descr "KSA http://www.ckswitches.com/media/1457/ksa_ksl.pdf")
 * 		(tags "SWITCH SMD KSA SW")
 * 		(property "Reference" "REF**"
 * 			(at 2.54 -2 0)
 * 			(layer "F.SilkS")
 * 			(uuid "b80df500-8d9c-4d25-8d9a-22a6e9909a9e")
 * 			(effects
 * 				(font
 * 					(size 1 1)
 * 					(thickness 0.15)
 * 				)
 * 			)
 * 		)
 * 		(property "Value" "KSA_Tactile_SPST"
 * 			(at 2.54 10 0)
 * 			(layer "F.Fab")
 * 			(uuid "6d46bc2a-0304-4ad6-a82b-952d2e9207f7")
 * 			(effects
 * 				(font
 * 					(size 1 1)
 * 					(thickness 0.15)
 * 				)
 * 			)
 * 		)
 * 		(property "Datasheet" ""
 * 			(at 0 0 0)
 * 			(unlocked yes)
 * 			(layer "F.Fab")
 * 			(hide yes)
 * 			(uuid "0a8f963f-091b-44aa-88f7-f6edab341d69")
 * 			(effects
 * 				(font
 * 					(size 1.27 1.27)
 * 					(thickness 0.15)
 * 				)
 * 			)
 * 		)
 * 		(property "Description" ""
 * 			(at 0 0 0)
 * 			(unlocked yes)
 * 			(layer "F.Fab")
 * 			(hide yes)
 * 			(uuid "cc65655e-80c5-400a-bca5-6f00847bc761")
 * 			(effects
 * 				(font
 * 					(size 1.27 1.27)
 * 					(thickness 0.15)
 * 				)
 * 			)
 * 		)
 * 		(attr through_hole)
 * 		(fp_line
 * 			(start -1.27 -1.27)
 * 			(end -1.27 8.89)
 * 			(stroke
 * 				(width 0.12)
 * 				(type solid)
 * 			)
 * 			(layer "F.SilkS")
 * 			(uuid "392389e2-956a-42e9-b53a-c9bd204feb39")
 * 		)
 * 		(fp_line
 * 			(start -1.27 -1.27)
 * 			(end 6.35 -1.27)
 * 			(stroke
 * 				(width 0.12)
 * 				(type solid)
 * 			)
 * 			(layer "F.SilkS")
 * 			(uuid "d8b849a6-624e-42b1-97a0-389fe1d2ed92")
 * 		)
 * 		(fp_line
 * 			(start -1.27 8.89)
 * 			(end 6.35 8.89)
 * 			(stroke
 * 				(width 0.12)
 * 				(type solid)
 * 			)
 * 			(layer "F.SilkS")
 * 			(uuid "55a2cf04-6d4d-4751-93e2-8d3d7f6f246e")
 * 		)
 * 		(fp_line
 * 			(start 6.35 8.89)
 * 			(end 6.35 -1.27)
 * 			(stroke
 * 				(width 0.12)
 * 				(type solid)
 * 			)
 * 			(layer "F.SilkS")
 * 			(uuid "7d112a91-5165-4c22-a991-0cff60634eb4")
 * 		)
 * 		(fp_circle
 * 			(center 2.54 3.81)
 * 			(end 0.54 3.81)
 * 			(stroke
 * 				(width 0.12)
 * 				(type solid)
 * 			)
 * 			(fill no)
 * 			(layer "F.SilkS")
 * 			(uuid "8b5f1c6e-d4e9-410d-875d-01f1d9e1c103")
 * 		)
 * 		(fp_line
 * 			(start -1.41 -1.14)
 * 			(end -1.41 8.75)
 * 			(stroke
 * 				(width 0.05)
 * 				(type solid)
 * 			)
 * 			(layer "F.CrtYd")
 * 			(uuid "f1bf93a4-b707-48d8-a04a-52d3c0eba92b")
 * 		)
 * 		(fp_line
 * 			(start -1.41 -1.14)
 * 			(end 6.49 -1.14)
 * 			(stroke
 * 				(width 0.05)
 * 				(type solid)
 * 			)
 * 			(layer "F.CrtYd")
 * 			(uuid "643a4484-1252-4e66-a4a9-1b75423cd49b")
 * 		)
 * 		(fp_line
 * 			(start 6.49 8.75)
 * 			(end -1.41 8.75)
 * 			(stroke
 * 				(width 0.05)
 * 				(type solid)
 * 			)
 * 			(layer "F.CrtYd")
 * 			(uuid "d2e8526d-3c71-4425-8f24-89e1424b6986")
 * 		)
 * 		(fp_line
 * 			(start 6.49 8.75)
 * 			(end 6.49 -1.14)
 * 			(stroke
 * 				(width 0.05)
 * 				(type solid)
 * 			)
 * 			(layer "F.CrtYd")
 * 			(uuid "4637dcc0-bbd4-40c9-bfdf-01abd45d066c")
 * 		)
 * 		(fp_line
 * 			(start -1.16 7.91)
 * 			(end -1.16 -0.29)
 * 			(stroke
 * 				(width 0.1)
 * 				(type solid)
 * 			)
 * 			(layer "F.Fab")
 * 			(uuid "e3ee0f8b-c074-4a64-893b-c94ee2da2e97")
 * 		)
 * 		(fp_line
 * 			(start -1.16 7.91)
 * 			(end 6.24 7.91)
 * 			(stroke
 * 				(width 0.1)
 * 				(type solid)
 * 			)
 * 			(layer "F.Fab")
 * 			(uuid "21bac3ae-67a6-4016-a4f4-7147ed98cf8b")
 * 		)
 * 		(fp_line
 * 			(start 6.24 -0.29)
 * 			(end -1.16 -0.29)
 * 			(stroke
 * 				(width 0.1)
 * 				(type solid)
 * 			)
 * 			(layer "F.Fab")
 * 			(uuid "6612585b-43c3-4e47-8f6e-6abb8d01c3ed")
 * 		)
 * 		(fp_line
 * 			(start 6.24 7.91)
 * 			(end 6.24 -0.29)
 * 			(stroke
 * 				(width 0.1)
 * 				(type solid)
 * 			)
 * 			(layer "F.Fab")
 * 			(uuid "0c785ae2-fbc6-42d8-985a-cd0160d0c075")
 * 		)
 * 		(fp_text user "${REFERENCE}"
 * 			(at 2.54 4 0)
 * 			(layer "F.Fab")
 * 			(uuid "4a2f78c3-368f-478a-b557-e4e7e6010c07")
 * 			(effects
 * 				(font
 * 					(size 1 1)
 * 					(thickness 0.15)
 * 				)
 * 			)
 * 		)
 * 		(pad "1" thru_hole circle
 * 			(at 0 0)
 * 			(size 1.778 1.778)
 * 			(drill 1.143)
 * 			(layers "*.Cu" "*.Mask")
 * 			(remove_unused_layers no)
 * 			(uuid "ada9ba87-9a30-451a-9527-e65964eac081")
 * 		)
 * 		(pad "2" thru_hole circle
 * 			(at 5.08 0)
 * 			(size 1.778 1.778)
 * 			(drill 1.143)
 * 			(layers "*.Cu" "*.Mask")
 * 			(remove_unused_layers no)
 * 			(uuid "2f06bc78-b921-4f7c-b884-ae1a6ebb1136")
 * 		)
 * 		(pad "3" thru_hole circle
 * 			(at 5.08 7.62)
 * 			(size 1.778 1.778)
 * 			(drill 1.143)
 * 			(layers "*.Cu" "*.Mask")
 * 			(remove_unused_layers no)
 * 			(uuid "fc51406b-d5d9-4c44-b535-dd9c2ff73b4c")
 * 		)
 * 		(pad "4" thru_hole circle
 * 			(at 2.54 7.62)
 * 			(size 1.778 1.778)
 * 			(drill 1.143)
 * 			(layers "*.Cu" "*.Mask")
 * 			(remove_unused_layers no)
 * 			(uuid "99b3fb25-746f-43d1-966c-399073e1bd02")
 * 		)
 * 		(pad "5" thru_hole circle
 * 			(at 0 7.62)
 * 			(size 1.778 1.778)
 * 			(drill 1.143)
 * 			(layers "*.Cu" "*.Mask")
 * 			(remove_unused_layers no)
 * 			(uuid "86443b51-37be-41a2-bc05-4943bc99dbf7")
 * 		)
 * 		(embedded_fonts no)
 * 		(model "${KICAD9_3DMODEL_DIR}/Button_Switch_THT.3dshapes/KSA_Tactile_SPST.step"
 * 			(offset
 * 				(xyz 0 0 0)
 * 			)
 * 			(scale
 * 				(xyz 1 1 1)
 * 			)
 * 			(rotate
 * 				(xyz 0 0 0)
 * 			)
 * 		)
 * 	)
 */
export class KicadElementFootprint extends WithOrigin(WithProperties(WithLayer(WithLayerColor(KicadElement)))) {

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