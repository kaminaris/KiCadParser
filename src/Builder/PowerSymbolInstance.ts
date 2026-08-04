import { KicadElementDnp }    from '../KicadElementBoolean';
import { KicadElementLibId }  from '../KicadElementString';
import { KicadElementSymbol } from '../KicadElementSymbol';
import { KicadElementUnit }   from '../KicadElementNumeric';

export type PowerSymbolInstanceOpts = {
	libId: string;
	x: number;
	y: number;
	rotation: number;
	ref: string;
	value: string;
	/** Vertical offset of Reference/Value text from the symbol origin (mm). */
	refOffsetY: number;
	valueOffsetY: number;
	refHidden: boolean;
	valueHidden: boolean;
};

/**
 * Schematic-level power symbol instance — real AST equivalent of
 * shared/kicad-layout/Place.ts's emitPowerGndInstance() text template, used
 * by the interactive editor session instead of the recipe/text-generation
 * flow. Same deliberate simplification that template already uses: no
 * `(pin "1" ...)` sub-block or `(instances ...)` block — pin geometry for
 * rendering/hit-testing resolves through the lib_symbols definition instead.
 *
 * Property text is kept upright (rot 0) and refOffsetY/valueOffsetY are
 * applied unrotated — correct for the rotation:0 placement every edit-mode
 * tool actually uses (rotating afterward goes through the existing
 * moveSymbolByRef/select-tool rotate path, same as any other symbol).
 */
export function buildPowerSymbolInstance(opts: PowerSymbolInstanceOpts): KicadElementSymbol {
	const instance = new KicadElementSymbol();
	instance.addChild(new KicadElementLibId(opts.libId));
	instance.setOrigin(opts.x, opts.y, opts.rotation);
	instance.setUuid();
	instance.findOrCreateChildByClass(KicadElementUnit).value = 1;
	instance.setExcludeFromSim(false).setInBom(true).setOnBoard(true);
	instance.findOrCreateChildByClass(KicadElementDnp).value = false;

	const propAt = { x: opts.x, y: opts.y, rot: 0 };
	instance.addChild(KicadElementSymbol.buildLibraryProperty('Reference', opts.ref, {
		x: opts.x, y: opts.y + opts.refOffsetY, rot: 0, hide: opts.refHidden
	}));
	instance.addChild(KicadElementSymbol.buildLibraryProperty('Value', opts.value, {
		x: opts.x, y: opts.y + opts.valueOffsetY, rot: 0, hide: opts.valueHidden
	}));
	instance.addChild(KicadElementSymbol.buildLibraryProperty('Footprint', '', { ...propAt, hide: true }));
	instance.addChild(KicadElementSymbol.buildLibraryProperty('Datasheet', '', { ...propAt, hide: true }));

	return instance;
}
