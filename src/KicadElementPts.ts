import { KicadElement } from './KicadElement';

export class KicadElementPts extends KicadElement {
	override writeChildren(): string {
		if (this.children.length <= 0) {
			return '';
		}

		const baseIndent = this.pad(1);
		const xySoftLimit = 99; // mimic KiCad's xySpecialCaseColumnLimit
		const lines: string[] = [baseIndent];
		let i = 0;

		let currentLineLength = baseIndent.length;

		for (const child of this.children) {
			const childStr = child.write().trim();
			const space = lines[i].trimEnd().length === 0 ? '' : ' ';
			const potentialStr = lines[i] + space + childStr;
			const potentialLength = potentialStr.length;

			// Mimic KiCad behavior:
			// - Always finish current child even if it exceeds soft limit
			// - Start a new line before the next child if it would exceed the soft limit
			if (currentLineLength >= xySoftLimit) {
				// previous line exceeded, start new line
				i++;
				lines[i] = baseIndent + childStr;
				currentLineLength = lines[i].length;
			}
			else {
				// append to current line
				lines[i] = potentialStr;
				currentLineLength = potentialLength;
			}
		}

		return lines.join('\n');
	}
}
