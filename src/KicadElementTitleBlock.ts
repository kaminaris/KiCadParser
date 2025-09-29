import { KicadElement } from './KicadElement';

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

}