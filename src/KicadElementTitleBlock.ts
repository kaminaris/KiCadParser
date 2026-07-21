import { KicadElement } from './KicadElement';
import { KicadElementComment } from './KicadElementComment';

/**
 * 	(title_block
 * 		(title "tajtel")
 * 		(date "2025-09-29")
 * 		(rev "refision")
 * 		(company "c")
 * 		(comment 1 "c1")
 * 		(comment 2 "c2")
 * 		(comment 3 "c3")
 * 		(comment 4 "c4")
 * 		(comment 5 "c5")
 * 		(comment 6 "c6")
 * 		(comment 7 "c7")
 * 		(comment 8 "c8")
 * 		(comment 9 "c9")
 * 	)
 */
export class KicadElementTitleBlock extends KicadElement {
	override name = 'title_block';

	// title/date/rev/company are registered @kicad-io classes (KicadElementTitle
	// etc., all extending KicadElementString) whose afterParse() moves the
	// parsed value into a typed `.value` field and CLEARS attributes[] —
	// getSimpleChildValue()'s attributes[0] read only works for tags with no
	// dedicated class, so it always returned '' here (confirmed gap: the
	// title block's own fields never made it past the tag's registered
	// class's own parsing).
	getTitle(): string { return String((this.findFirstChildByName('title') as any)?.value ?? ''); }
	getDate(): string { return String((this.findFirstChildByName('date') as any)?.value ?? ''); }
	getRev(): string { return String((this.findFirstChildByName('rev') as any)?.value ?? ''); }
	getCompany(): string { return String((this.findFirstChildByName('company') as any)?.value ?? ''); }

	/** `(comment 1 "c1")` — one child per comment slot (1-9). KicadElementComment
	 * (its own registered class) also clears attributes[] after parsing,
	 * storing the slot number/text in its own typed `.index`/`.value`. */
	getComment(index: number): string {
		const el = this.findChildrenByClass(KicadElementComment).find(c => c.index === index);
		return el?.value ?? '';
	}
}