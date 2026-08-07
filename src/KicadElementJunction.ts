import { WithOrigin }           from './Mixins/WithOrigin';
import { WithUUID }             from './Mixins/WithUUID';
import { KicadElement }         from './KicadElement';
import { KicadElementDiameter } from './KicadElementNumeric';
import { KicadElementColor }    from './KicadElementColor';
import { KicadElementAt }       from './KicadElementAt';

/**
 * (junction (at x y) (diameter 0) (color 0 0 0 0) (uuid "..."))
 * diameter/color get inline setters (not a mixin — every existing emitter in
 * this codebase, e.g. shared/kicad-layout/Router.ts's emitJunctionsSexpr,
 * only ever uses the fixed values (diameter 0)/(color 0 0 0 0), and no other
 * class needs either field, so a dedicated mixin would have exactly one
 * consumer — inconsistent with how single-use color/numeric fields are
 * handled elsewhere in this codebase).
 */
export class KicadElementJunction extends WithUUID(WithOrigin(KicadElement)) {
	override name = 'junction';

	/** Grammar is (at x y) — no rotation slot. WithOrigin's rotation param
	 *  defaults to 0 and would write an invalid (at x y 0), so override to
	 *  never touch it. */
	override setOrigin(x: number, y: number): void {
		const at = this.findOrCreateChildByClass(KicadElementAt);
		at.x = x;
		at.y = y;
	}

	setDiameter(diameter: number): void {
		this.findOrCreateChildByClass(KicadElementDiameter).value = diameter;
	}

	getDiameter(): number {
		return this.findFirstChildByClass(KicadElementDiameter)?.value ?? 0;
	}

	setColor(r: number, g: number, b: number, a: number): void {
		this.findOrCreateChildByClass(KicadElementColor).setColor(r, g, b, a);
	}

	getColor(defaultColor = 'rgba(0,0,0,0)'): string {
		return this.findFirstChildByClass(KicadElementColor)?.getColor() ?? defaultColor;
	}

	/** null distinguishes "no override" from "explicitly set" — same
	 *  reasoning as WithStroke.getStrokeColorOverride(), with one extra
	 *  wrinkle specific to junctions: shared/kicad-layout/Router.ts's own
	 *  emitter always writes a literal (color 0 0 0 0), which is real
	 *  KiCad's own COLOR4D::UNSPECIFIED sentinel (common/gal/color4d.cpp,
	 *  confirmed in the user's local checkout) for "not customized" — not a
	 *  genuine "render fully transparent" instruction — so a present-but-
	 *  all-zero color child counts as unset too, not just an absent one. */
	getColorOverride(): string | null {
		const color = this.findFirstChildByClass(KicadElementColor);
		if (!color || (color.red === 0 && color.green === 0 && color.blue === 0 && color.alpha === 0)) {
			return null;
		}
		return color.getColor();
	}
}