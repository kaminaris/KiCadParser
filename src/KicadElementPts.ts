import { KicadElement } from './KicadElement';

export class KicadElementPts extends KicadElement {
	pointsPerLine = 0;

	strLength(s: string) {
		const tabSze = 1;
		const sTrim = s.trim();
		let length = sTrim.length;

		// Count tabs and add tab size
		const tabCount = (s.match(/\t/g) || []).length;
		length += tabCount * tabSze;

		return length;
	}

	/**
	 * TODO: this is a bit ugly, but it works for now.
	 */
	override writeChildren(): string {
		if (this.children.length <= 0) {
			return '';
		}

		const baseIndent = this.pad(1);
		const xySoftLimit = 99; // mimic KiCad's xySpecialCaseColumnLimit
		const lines: string[] = [baseIndent];
		let i = 0;

		let currentLineLength = this.strLength(baseIndent);

		for (const child of this.children) {
			const childStr = child.write().trim();
			const space = lines[i].trimEnd().length === 0 ? '' : ' ';
			const potentialStr = lines[i] + space + childStr;
			const potentialLength = this.strLength(potentialStr);

			// Mimic KiCad behavior:
			// - Always finish current child even if it exceeds soft limit
			// - Start a new line before the next child if it would exceed the soft limit
			if (currentLineLength >= xySoftLimit) {
				// previous line exceeded, start new line
				i++;
				lines[i] = baseIndent + childStr;
				currentLineLength = this.strLength(lines[i]);
			}
			else {
				// append to current line
				lines[i] = potentialStr;
				currentLineLength = potentialLength;
			}
		}

		return lines.join('\n');
	}

	writeChildrenWithPointsPerLine() {
		if (this.children.length <= 0) {
			return '';
		}

		const baseIndent = this.pad(1);
		const lines = [baseIndent];
		let i = 0;
		let pointsInCurrentLine = 0;
		for (const child of this.children) {
			const childStr = child.write().trim();

			if (pointsInCurrentLine < this.pointsPerLine) {
				// Add to current line
				const isLastCharTab = lines[i].endsWith('\t');
				lines[i] = lines[i] + (isLastCharTab ? childStr : ' ' + childStr);
				pointsInCurrentLine++;
			}
			else {
				// Start a new line
				i++;
				lines[i] = baseIndent + childStr;
				pointsInCurrentLine = 1;
			}
		}

		return lines.join('\n');
	}
}
