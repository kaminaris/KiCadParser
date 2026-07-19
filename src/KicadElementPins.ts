import { KicadElement } from './KicadElement';

/**
 * (pins "1" "2" "3" ...) - the pin-number list inside a KiCad 10 footprint
 * jumper unit, e.g.:
 *
 * (units
 * 		(unit
 * 			(name "A")
 * 			(pins "1" "2" "3")
 * 		)
 * )
 *
 * KiCad wraps this quoted-string list across multiple lines once the line
 * gets long, using what looks like a simple greedy line-fill at ~76 raw
 * characters (including leading tab indentation) - reverse-engineered from
 * real KiCad 10 board output, since this wrapping isn't otherwise
 * documented and no other element in the format seems to do it.
 */
export class KicadElementPins extends KicadElement {
	override name = 'pins';

	static readonly WRAP_WIDTH = 76;

	override write(): string {
		const attrs = this.formatAttributes();
		if (attrs.length === 0) {
			return this.pad() + `(${ this.name })`;
		}

		const prefix = this.pad() + `(${ this.name } `;
		const contPrefix = this.pad(1);

		const lines: string[] = [];
		let cur = prefix;
		let curHasToken = false;

		for (const attr of attrs) {
			const piece = curHasToken ? ' ' + attr : attr;
			if (curHasToken && (cur + piece).length > KicadElementPins.WRAP_WIDTH) {
				lines.push(cur);
				cur = contPrefix + attr;
			}
			else {
				cur += piece;
			}
			curHasToken = true;
		}
		lines.push(cur);

		if (lines.length === 1) {
			return lines[0] + ')';
		}

		return lines.join('\n') + '\n' + this.pad() + ')';
	}
}
