import { KicadElementDnp, KicadElementExcludeFromSim, KicadElementInBom, KicadElementOnBoard } from './KicadElementBoolean';
import { KicadElementPolyline } from './KicadElementPolyline';
import { KicadElement }         from './KicadElement';

/**
 * A KiCad 10 "rule area" (used for multichannel design matching / netclass-
 * by-region annotation) - a schematic polyline-outlined region with the
 * same in_bom/on_board/dnp/exclude_from_sim flags a symbol or footprint
 * has. Note the uuid lives on the nested polyline, not on the rule_area
 * itself - see getPolyline()/getUuid().
 *
 * Confirmed against real KiCad (eeschema/sch_rule_area.h/.cpp in the user's
 * local checkout): SCH_RULE_AREA extends SCH_SHAPE (SHAPE_T::POLY) and is
 * drawn through the exact same generic shape-outline path as any other
 * polyline — no special rendering of its own, just its own layer color.
 * The "which directive labels are attached to this border" relationship
 * (SCH_RULE_AREA::m_directives / GetResolvedNetclasses) is computed
 * dynamically by real KiCad from GEOMETRY (a directive label whose anchor
 * sits on the border), not stored as an explicit reference in the file —
 * nothing to parse here for that relationship, it's a runtime computation
 * on the real KiCad side.
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

	getUuid(): string | undefined {
		return this.getPolyline()?.getUuid();
	}

	isDnp(): boolean {
		return this.findFirstChildByClass(KicadElementDnp)?.value ?? false;
	}

	setDnp(value: boolean): void {
		this.findOrCreateChildByClass(KicadElementDnp).value = value;
	}

	isExcludedFromSim(): boolean {
		return this.findFirstChildByClass(KicadElementExcludeFromSim)?.value ?? false;
	}

	setExcludedFromSim(value: boolean): void {
		this.findOrCreateChildByClass(KicadElementExcludeFromSim).value = value;
	}

	isInBom(): boolean {
		return this.findFirstChildByClass(KicadElementInBom)?.value ?? true;
	}

	setInBom(value: boolean): void {
		this.findOrCreateChildByClass(KicadElementInBom).value = value;
	}

	isOnBoard(): boolean {
		return this.findFirstChildByClass(KicadElementOnBoard)?.value ?? true;
	}

	setOnBoard(value: boolean): void {
		this.findOrCreateChildByClass(KicadElementOnBoard).value = value;
	}

	getPolyline(): KicadElementPolyline | undefined {
		return this.findFirstChildByClass(KicadElementPolyline);
	}
}
