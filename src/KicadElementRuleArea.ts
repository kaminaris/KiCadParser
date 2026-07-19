import { KicadElementDnp }      from './KicadElementBoolean';
import { KicadElementPolyline } from './KicadElementPolyline';
import { KicadElement }         from './KicadElement';

/**
 * A KiCad 10 "rule area" (used for multichannel design matching) - a
 * schematic polyline-outlined region with the same in_bom/on_board/dnp/
 * exclude_from_sim flags a symbol or footprint has. Note the uuid lives on
 * the nested polyline, not on the rule_area itself - see getPolyline().
 *
 * (rule_area
 * 		(exclude_from_sim no)
 * 		(in_bom yes)
 * 		(on_board yes)
 * 		(dnp no)
 * 		(polyline (pts ...) (stroke ...) (fill ...) (uuid ...))
 * )
 */
export class KicadElementRuleArea extends KicadElement {
	override name = 'rule_area';

	isDnp(): boolean {
		return this.findFirstChildByClass(KicadElementDnp)?.value ?? false;
	}

	getPolyline(): KicadElementPolyline | undefined {
		return this.findFirstChildByClass(KicadElementPolyline);
	}
}
