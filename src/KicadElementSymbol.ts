import {
	KicadElementDnp,
	KicadElementDuplicatePinNumbersAreJumpers,
	KicadElementEmbeddedFonts,
	KicadElementExcludeFromSim,
	KicadElementHide,
	KicadElementInBom,
	KicadElementInPosFiles,
	KicadElementOnBoard
} from './KicadElementBoolean';
import { WithOrigin }             from './Mixins/WithOrigin';
import { WithProperties }         from './Mixins/WithProperties';
import { WithUUID }               from './Mixins/WithUUID';
import { KicadElementUnit }       from './KicadElementNumeric';
import { KicadElementExtends, KicadElementLibId } from './KicadElementString';
import { KicadElementMirror } from './KicadElementLiteral';
import { KicadElementPinNames }   from './KicadElementPinNames';
import { KicadElementPinNumbers } from './KicadElementPinNumbers';
import { KicadElement }           from './KicadElement';
import { KicadElementProperty }   from './KicadElementProperty';
import type { KicadJustifyHorizontal, KicadJustifyVertical } from './KicadElementJustify';

/** Library-field anchor `(at x y [rot])`. */
export type KicadSymbolPropAt = { x: number; y: number; rot?: number };

/** Options for {@link KicadElementSymbol.addStandardLibraryProperties}. */
export type KicadSymbolLibraryPropertiesOpts = {
	reference: string;
	value: string;
	footprint?: string;
	datasheet?: string;
	/** Written as property "Description" (hidden). */
	description?: string;
	/** Written as property "ki_description" (hidden). */
	kiDescription?: string;
	keywords?: string;
	fpFilters?: string;
	/** Extra hidden properties (e.g. Sim.Pins) in declaration order. */
	extraProperties?: Array<{ name: string; value: string }>;
	refAt: KicadSymbolPropAt;
	valAt: KicadSymbolPropAt;
	footprintAt?: KicadSymbolPropAt;
	datasheetAt?: KicadSymbolPropAt;
	refJustify?: KicadJustifyHorizontal;
	valJustify?: KicadJustifyHorizontal;
	refJustifyVertical?: KicadJustifyVertical;
	valJustifyVertical?: KicadJustifyVertical;
	refHidden?: boolean;
	valHidden?: boolean;
	/** Emit KiCad 10 `(show_name no)` / `(do_not_autoplace no)` on each property. Default true. */
	kicad10PropertyFlags?: boolean;
};

const LIBRARY_PROP_FONT = 1.27;

export class KicadElementSymbol extends WithUUID(WithOrigin(WithProperties(KicadElement))) {
	override name = 'symbol';
	symbolName?: string;

	constructor(symbolName?: string) {
		super();
		if (symbolName) {
			this.symbolName = symbolName;
		}
	}

	getLibId(): string | undefined {
		const libIdProp = this.findFirstChildByClass(KicadElementLibId);
		return libIdProp?.value ?? undefined;
	}

	/** `(extends "Base")` — the parent library symbol's name, unqualified
	 *  (matches how it's written: plain symbol name, no library prefix, per
	 *  sch_io_kicad_sexpr_parser.cpp's T_extends case). Only meaningful on a
	 *  top-level LIBRARY symbol (a `lib_symbols` entry), never on a placed
	 *  instance. */
	getExtends(): string | undefined {
		return this.findFirstChildByClass(KicadElementExtends)?.value || undefined;
	}

	isDerived(): boolean {
		return !!this.getExtends();
	}

	setExtends(baseName: string | undefined): void {
		if (!baseName) {
			const existing = this.findFirstChildByClass(KicadElementExtends);
			if (existing) {
				const idx = this.children.indexOf(existing);
				if (idx >= 0) this.children.splice(idx, 1);
			}
			return;
		}
		this.findOrCreateChildByClass(KicadElementExtends).value = baseName;
	}

	/** `(mirror x)` / `(mirror y)` on a PLACED symbol instance — meaningful
	 *  only there, never on a library definition. Deliberately a plain
	 *  replace, not real KiCad's own incremental-transform composition
	 *  (`SCH_SYMBOL::SetOrientation`, which folds mirror+rotation together
	 *  and can turn a mirror-then-mirror into a net rotation) — this app's
	 *  own SchematicPainter.readMirror()/buildInstanceMatrix already only
	 *  ever model one mutually-exclusive axis-or-none, matching the
	 *  normalized state real KiCad itself collapses "both axes" down to
	 *  (its own header comment: "MIRROR_Y is returned as MIRROR_X with an
	 *  orientation 180", i.e. mirroring both axes IS a 180° rotation) — so
	 *  this simpler replace-only setter is correct for THIS app's model,
	 *  just not a full port of KiCad's own compose-with-rotation state
	 *  machine. */
	getMirror(): 'x' | 'y' | null {
		const value = this.findFirstChildByClass(KicadElementMirror)?.value;
		return value === 'x' || value === 'y' ? value : null;
	}

	setMirror(axis: 'x' | 'y' | null): void {
		if (!axis) {
			const existing = this.findFirstChildByClass(KicadElementMirror);
			if (existing) {
				const idx = this.children.indexOf(existing);
				if (idx >= 0) this.children.splice(idx, 1);
			}
			return;
		}
		this.findOrCreateChildByClass(KicadElementMirror).value = axis;
	}

	getLayers() {
		return this.findChildrenByClass(KicadElementSymbol);
	}

	/** Highest `unit` found across this symbol's own sub-unit children (named
	 *  "<LibName>_<unit>_<style>"), e.g. 5 for a quad-gate-plus-power-unit part
	 *  like "4016". Unit 0 ("shared across every unit") doesn't count as a
	 *  placeable unit. A symbol with no sub-units (single-unit part, or a
	 *  derived symbol — callers resolve `extends` before calling this) is 1. */
	getUnitCount(): number {
		const layers = this.getLayers();
		let max = 1;
		for (const layer of layers) {
			if (typeof layer.deconstructSymbolName !== 'function') continue;
			const { unit } = layer.deconstructSymbolName();
			if (unit > max) max = unit;
		}
		return max;
	}

	setSymbolName(name: string) {
		this.symbolName = name;
	}

	deconstructSymbolName(): { libName: string, unit: number, deMorgan: number } {
		const parts = this.symbolName?.split('_') ?? [];
		if (parts.length < 3) {
			return { libName: this.symbolName ?? '', unit: 1, deMorgan: 0 };
		}

		// For multi-part names like "74LS00", rejoin all parts except last 2
		const unit = +parts[parts.length - 2];
		const deMorgan = +parts[parts.length - 1];
		const libName = parts.slice(0, -2).join('_');

		// Validate and provide defaults
		const validUnit = isNaN(unit) ? 1 : unit;
		const validDeMorgan = isNaN(deMorgan) ? 0 : deMorgan;

		return {
			libName: libName ?? this.symbolName ?? '',
			unit: validUnit,
			deMorgan: validDeMorgan
		};
	}

	/** True when the library symbol has `(pin_numbers hide)` / `(hide yes)`. */
	arePinNumbersHidden(): boolean {
		const pinNumbers = this.findFirstChildByClass(KicadElementPinNumbers);
		return pinNumbers ? pinNumbers.isHidden() : false;
	}

	/**
	 * Show or hide pin numbers: `(pin_numbers (hide yes))`.
	 * When `visible` is true, the `pin_numbers` block is omitted (KiCad 10 style).
	 * @param visible `true` = show numbers, `false` = hide them
	 */
	togglePinNumbers(visible: boolean): this {
		if (visible) {
			const existing = this.findFirstChildByClass(KicadElementPinNumbers);
			if (existing) {
				const idx = this.children.indexOf(existing);
				if (idx >= 0) {
					this.children.splice(idx, 1);
				}
			}
			return this;
		}
		this.findOrCreateChildByClass(KicadElementPinNumbers).setHidden(true);
		return this;
	}

	/**
	 * @deprecated Misnamed — historically checked pin_numbers. Prefer
	 * {@link arePinNumbersHidden}. Kept so older painter call sites still work.
	 */
	arePinNamesHidden(): boolean {
		return this.arePinNumbersHidden();
	}

	/**
	 * True when the library symbol has `(pin_names … hide)` (bare attr) or
	 * `(pin_names (hide yes))`.
	 */
	arePinNameLabelsHidden(): boolean {
		const pinNames = this.findFirstChildByClass(KicadElementPinNames)
			?? this.findFirstChildByName('pin_names');
		if (!pinNames) {
			return false;
		}
		if (pinNames instanceof KicadElementPinNames) {
			return pinNames.isHidden();
		}
		const hideChild = pinNames.findFirstChildByClass(KicadElementHide);
		if (hideChild) {
			return hideChild.value;
		}
		return pinNames.attributes.some(
			a => a.value === 'hide' || a.value === true
		);
	}

	/**
	 * Show or hide pin name labels: `(pin_names (offset …) [(hide yes)])`.
	 * Visible names omit the hide child (KiCad 10).
	 * @param visible `true` = show names, `false` = hide them
	 * When `offsetMm` is omitted, keeps any existing offset (defaults to 0 when creating fresh).
	 */
	togglePinNames(visible: boolean, offsetMm?: number): this {
		const pinNames = this.findOrCreateChildByClass(KicadElementPinNames);
		if (offsetMm !== undefined) {
			pinNames.setOffset(offsetMm);
		}
		pinNames.setHidden(!visible);
		return this;
	}

	setPinNameOffset(offsetMm: number): this {
		this.findOrCreateChildByClass(KicadElementPinNames).setOffset(offsetMm);
		return this;
	}

	setInBom(value = true): this {
		const el = this.findOrCreateChildByClass(KicadElementInBom);
		el.value = value;
		return this;
	}

	setOnBoard(value = true): this {
		const el = this.findOrCreateChildByClass(KicadElementOnBoard);
		el.value = value;
		return this;
	}

	setExcludeFromSim(value: boolean): this {
		const el = this.findOrCreateChildByClass(KicadElementExcludeFromSim);
		el.value = value;
		return this;
	}

	setInPosFiles(value = true): this {
		const el = this.findOrCreateChildByClass(KicadElementInPosFiles);
		el.value = value;
		return this;
	}

	setDuplicatePinNumbersAreJumpers(value = false): this {
		const el = this.findOrCreateChildByClass(KicadElementDuplicatePinNumbersAreJumpers);
		el.value = value;
		return this;
	}

	setEmbeddedFonts(value = false): this {
		const el = this.findOrCreateChildByClass(KicadElementEmbeddedFonts);
		el.value = value;
		return this;
	}

	/**
	 * Build a library-symbol property with standard 1.27 mm font.
	 * KiCad 10 order: at → show_name → do_not_autoplace → [hide] → effects.
	 */
	static buildLibraryProperty(
		name: string,
		value: string,
		opts: {
			x: number;
			y: number;
			rot?: number;
			hide?: boolean;
			justify?: KicadJustifyHorizontal;
			justifyVertical?: KicadJustifyVertical;
			kicad10PropertyFlags?: boolean;
		}
	): KicadElementProperty {
		const prop = new KicadElementProperty(name, value);
		prop.setOrigin(opts.x, opts.y, opts.rot ?? 0);
		if (opts.kicad10PropertyFlags !== false) {
			prop.setShowName(false);
			prop.setDoNotAutoplace(false);
		}
		if (opts.hide) {
			prop.setHidden(true);
		}
		prop.setFont(LIBRARY_PROP_FONT, LIBRARY_PROP_FONT);
		if (opts.justify || opts.justifyVertical) {
			prop.setJustify(opts.justify, opts.justifyVertical);
		}
		return prop;
	}

	/**
	 * Add Reference / Value / Footprint / Datasheet (+ optional Description /
	 * ki_* metadata) — the boilerplate shared by Device:* library symbols.
	 */
	addStandardLibraryProperties(opts: KicadSymbolLibraryPropertiesOpts): this {
		const flags = opts.kicad10PropertyFlags;
		this.addChild(KicadElementSymbol.buildLibraryProperty('Reference', opts.reference, {
			...opts.refAt,
			hide: opts.refHidden,
			justify: opts.refJustify,
			justifyVertical: opts.refJustifyVertical,
			kicad10PropertyFlags: flags
		}));
		this.addChild(KicadElementSymbol.buildLibraryProperty('Value', opts.value, {
			...opts.valAt,
			hide: opts.valHidden,
			justify: opts.valJustify,
			justifyVertical: opts.valJustifyVertical,
			kicad10PropertyFlags: flags
		}));

		const fpAt = opts.footprintAt ?? { x: 0, y: 0, rot: 0 };
		this.addChild(KicadElementSymbol.buildLibraryProperty('Footprint', opts.footprint ?? '', {
			...fpAt,
			hide: true,
			kicad10PropertyFlags: flags
		}));

		const dsAt = opts.datasheetAt ?? { x: 0, y: 0, rot: 0 };
		this.addChild(KicadElementSymbol.buildLibraryProperty('Datasheet', opts.datasheet ?? '', {
			...dsAt,
			hide: true,
			kicad10PropertyFlags: flags
		}));

		if (opts.description !== undefined) {
			this.addChild(KicadElementSymbol.buildLibraryProperty('Description', opts.description, {
				x: 0,
				y: 0,
				hide: true,
				kicad10PropertyFlags: flags
			}));
		}
		if (opts.extraProperties) {
			for (const extra of opts.extraProperties) {
				this.addChild(KicadElementSymbol.buildLibraryProperty(extra.name, extra.value, {
					x: 0,
					y: 0,
					hide: true,
					kicad10PropertyFlags: flags
				}));
			}
		}
		if (opts.keywords !== undefined) {
			this.addChild(KicadElementSymbol.buildLibraryProperty('ki_keywords', opts.keywords, {
				x: 0,
				y: 0,
				hide: true,
				kicad10PropertyFlags: flags
			}));
		}
		if (opts.kiDescription !== undefined) {
			this.addChild(KicadElementSymbol.buildLibraryProperty('ki_description', opts.kiDescription, {
				x: 0,
				y: 0,
				hide: true,
				kicad10PropertyFlags: flags
			}));
		}
		if (opts.fpFilters !== undefined) {
			this.addChild(KicadElementSymbol.buildLibraryProperty('ki_fp_filters', opts.fpFilters, {
				x: 0,
				y: 0,
				hide: true,
				kicad10PropertyFlags: flags
			}));
		}
		return this;
	}

	static filterRealSymbols(symbols: KicadElementSymbol[]): KicadElementSymbol[] {
		return symbols.filter(s => {
			const props = s.getAllProperties();
			if (!props['Reference']) {
				return false;
			}
			if (props['Reference'].startsWith('~') || props['Reference'].startsWith('#')) {
				return false;
			}
			return true;
		});
	}

	addBaselineProperties() {
		/**
		 * (property "Reference" "U"
		 *     (at -6.35 6.35 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *     )
		 * )
		 */
		const refProp = new KicadElementProperty('Reference', 'U');
		refProp.setOrigin(-6.35, 6.35, 0);
		refProp.setFont(1.27, 1.27);
		this.children.push(refProp);

		/**
		 * (property "Value" "ISO1050DUB"
		 *     (at 2.54 6.35 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *     )
		 * )
		 */
		const valProp = new KicadElementProperty('Value', 'SymbolValue');
		valProp.setOrigin(2.54, 6.35, 0);
		valProp.setFont(1.27, 1.27);
		this.children.push(valProp);

		/**
		 * (property "Footprint" "Package_SO:SOP-8_6.62x9.15mm_P2.54mm"
		 *     (at 0 -8.89 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *             (italic yes)
		 *         )
		 *         (hide yes)
		 *     )
		 * )
		 */
		const footprintProp = new KicadElementProperty('Footprint', '');
		footprintProp.setOrigin(0, -8.89, 0);
		footprintProp.setFont(1.27, 1.27, true);
		footprintProp.setHidden(true);
		this.children.push(footprintProp);

		/**
		 * (property "Datasheet" "http://www.ti.com/lit/ds/symlink/iso1050.pdf"
		 *     (at 0 -1.27 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *         (hide yes)
		 *     )
		 * )
		 */
		const datasheetProp = new KicadElementProperty('Datasheet', '');
		datasheetProp.setOrigin(0, -1.27, 0);
		datasheetProp.setFont(1.27, 1.27);
		datasheetProp.setHidden(true);
		this.children.push(datasheetProp);

		/**
		 * (property "Description" "Isolated CAN Transceiver, SOP-8"
		 *     (at 0 0 0)
		 *     (effects
		 *         (font
		 *             (size 1.27 1.27)
		 *         )
		 *         (hide yes)
		 *     )
		 * )
		 */
		const descriptionProp = new KicadElementProperty('Description', '');
		descriptionProp.setOrigin(0, 0, 0);
		descriptionProp.setFont(1.27, 1.27);
		descriptionProp.setHidden(true);

		this.children.push(descriptionProp);
	}

	override afterParse() {
		// first attribute is the symbol name
		if (this.attributes.length > 0) {
			this.symbolName = this.attributes[0].value as string;
			// remove first attribute
			this.attributes.splice(0, 1);
		}
	}

	override write(): string {
		const attrs = this.formatAttributes();
		let attrStr = this.symbolName !== undefined ? ` "${ this.escapeString(this.symbolName) }"` : '';
		attrStr += (attrs.length > 0 ? ' ' + attrs.join(' ') : '');

		if (this.children.length === 0) {
			return this.pad() + `(${ this.name }${ attrStr })`;
		}

		return this.pad() + `(${ this.name }${ attrStr }\n${ this.writeChildren() }\n${ this.pad() })`;
	}

	getReference() {
		const refProp = this.getPropertyByName('Reference');
		return refProp?.propertyValue ?? '';
	}

	getUnitId() {
		const unit = this.findFirstChildByClass(KicadElementUnit);
		return unit?.value ?? 0;
	}

	isDnp() {
		const dnpChild = this.findFirstChildByClass(KicadElementDnp);
		if (!dnpChild) {
			return false;
		}

		return dnpChild.value;
	}

	/** Set the placed symbol's do-not-populate attribute. */
	setDnp(value = true): this {
		const dnpChild = this.findOrCreateChildByClass(KicadElementDnp);
		dnpChild.value = value;
		return this;
	}
}
