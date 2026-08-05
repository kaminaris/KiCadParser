import { KicadElement } from './KicadElement';
import { WithEffects } from './Mixins/WithEffects';
import { WithJustify } from './Mixins/WithJustify';
import { WithOrigin } from './Mixins/WithOrigin';
import { WithUUID } from './Mixins/WithUUID';

/** Root-level schematic table introduced by KiCad 8. */
export class KicadElementTable extends WithUUID(KicadElement) {
	override name = 'table';
}

/**
 * One table cell. It is text-like, but its geometry is carried by sibling
 * `(at ...)`, `(size ...)`, `(margins ...)`, and `(span ...)` children rather
 * than the normal standalone-text structure.
 */
export class KicadElementTableCell extends WithUUID(WithOrigin(WithEffects(WithJustify(KicadElement)))) {
	override name = 'table_cell';
	value = '';

	override afterParse(): void {
		// Empty cells are emitted by KiCad as `(table_cell ...)` with no text
		// attribute. They are valid cells and must survive parse/serialize
		// cycles (including undo snapshots).
		if (this.attributes.length > 1) {
			throw new Error(`${this.name} expects exactly one text attribute, got ${this.attributes.length}`);
		}
		this.value = this.attributes.length === 1 ? String(this.attributes[0]!.value) : '';
		this.attributes.length = 0;
	}
}
