import { WithOrigin }        from './Mixins/WithOrigin';
import { WithEffects }       from './Mixins/WithEffects';
import { WithJustify }       from './Mixins/WithJustify';
import { WithProperties }    from './Mixins/WithProperties';
import { WithUUID }          from './Mixins/WithUUID';
import { KicadElementShape } from './KicadElementLiteral';
import { KicadElementLength } from './KicadElementNumeric';
import { KicadElement }      from './KicadElement';

/** KiCad's "Directive Label" tool — UI name for the `netclass_flag` tag
 *  (the file-format token never actually got renamed to `directive_label`
 *  despite the class-name/UI rename — confirmed in the user's local KiCad
 *  checkout's sch_io_kicad_sexpr_parser.cpp, which still writes/reads
 *  T_netclass_flag as the primary token). Ports the SAME generic label
 *  grammar as label/global_label/hierarchical_label (parseSchText handles
 *  all four with one shared code path in real KiCad) plus one extra field,
 *  `length` (the pole length), and a different `shape` vocabulary
 *  (dot/round/diamond/rectangle — a glyph style, not an electrical
 *  direction like global/hier's input/output/etc).
 *
 * Real example (user-supplied, from a live schematic):
 * (netclass_flag ""
 * 		(length 2.54)
 * 		(shape round)
 * 		(at 173.99 66.04 0)
 * 		(fields_autoplaced yes)
 * 		(effects (font (size 1.27 1.27)) (justify left bottom))
 * 		(uuid "37a0b1d0-2768-4338-b08b-0cb85263fe5d")
 * 		(property "Netclass" "" (at -46.99 -8.89 0) ...)
 * )
 *
 * The top-level quoted attribute (SCH_LABEL_BASE::GetText(), inherited)
 * is vestigial for this element — real files leave it empty and carry the
 * actual user-facing text in the "Netclass" property instead, so getName/
 * setName proxy to that property rather than the top-level attribute
 * (unlike KicadElementGlobalLabel, where the attribute IS the real text).
 * This also means the existing generic label-rename path in
 * KicadRenderSession (renameLabel: `typeof el.setName === 'function'`)
 * works here unmodified — same method name, different backing field.
 * A "Component Class" property can ALSO appear alongside "Netclass" on the
 * same element (a separate, more advanced rule-area/DRC annotation) — not
 * surfaced by any accessor here (out of scope for the edit-mode toolbar),
 * but WithProperties' generic getProperties()/getAllProperties() already
 * preserves it through parse -> write without data loss regardless.
 */
export type KicadDirectiveLabelShape = 'dot' | 'round' | 'diamond' | 'rectangle';

export class KicadElementNetclassFlag extends WithUUID(WithOrigin(WithEffects(WithJustify(WithProperties(KicadElement))))) {
	override name = 'netclass_flag';

	getName(): string {
		return this.getNetclassName();
	}

	setName(name: string): void {
		this.setProperty('Netclass', name);
	}

	getNetclassName(): string {
		return this.getPropertyByName('Netclass')?.propertyValue ?? '';
	}

	getShape(): KicadDirectiveLabelShape {
		const shape = this.findFirstChildByClass(KicadElementShape);
		return (shape?.value as KicadDirectiveLabelShape) ?? 'round';
	}

	setShape(shape: KicadDirectiveLabelShape): void {
		this.findOrCreateChildByClass(KicadElementShape).value = shape;
	}

	/** The pole length from the anchor point to the glyph (mm) — real
	 *  KiCad's own UI default is 2.54mm (one grid unit), matched here. */
	getPinLength(): number {
		return this.findFirstChildByClass(KicadElementLength)?.value ?? 2.54;
	}

	setPinLength(length: number): void {
		this.findOrCreateChildByClass(KicadElementLength).value = length;
	}

	/**
	 * Real KiCad's parser (parseSchText) does an unconditional NeedSYMBOL()
	 * for every one of the 4 label tags right after the tag name — a real
	 * file always has a quoted string there, even when it's "". A freshly-
	 * constructed instance never touches `this.attributes` (setName proxies
	 * to the Netclass property instead, per the class doc comment above), so
	 * without this override, write() would omit the token entirely
	 * (KicadElement.write()'s attrStr is '' when attributes.length === 0) —
	 * grammar-invalid, the same class of bug as the original no_connect/
	 * junction "(at x y 0)" fix elsewhere in this codebase. Guarded on
	 * attributes still being empty so a genuinely PARSED file's real
	 * attribute (pushed additively by the parser, never cleared first) is
	 * never duplicated.
	 */
	override write(): string {
		if (this.attributes.length === 0) {
			this.attributes.push({ format: 'quoted', value: '' });
		}
		return super.write();
	}
}
