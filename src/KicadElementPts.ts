import { KicadElement }        from './KicadElement';

export class KicadElementPts extends KicadElement {

	/**
	 * TODO: this is a bit ugly, but it works for now.
	 */
	override writeChildren(): string {
		if (this.children.length <= 0) {
			return '';
		}

		const baseIndent = this.pad(1);
		const maxLineLength = 120;
		const lines = [baseIndent];
		let i = 0;

		for (const child of this.children) {
			const childStr = child.write().trim();

			// Calculate what the total line length would be including indentation
			const isLastCharTab = lines[i].endsWith('\t');
			const potentialStr = lines[i] + (isLastCharTab ? childStr : ' ' + childStr);

			if (potentialStr.length <= maxLineLength) {
				lines[i] = potentialStr;
				continue;
			}

			// If adding the child would exceed the max line length, start a new line
			i++;
			lines[i] = baseIndent + childStr;
		}

		return lines.join('\n');
	}
	//
	// writeChildrenWithPointsPerLine() {
	// 	if (this.children.length <= 0) {
	// 		return '';
	// 	}
	//
	// 	const baseIndent = this.pad(1);
	// 	const lines = [baseIndent];
	// 	let i = 0;
	// 	let pointsInCurrentLine = 0;
	// 	for (const child of this.children) {
	// 		const childStr = child.write().trim();
	//
	// 		if (pointsInCurrentLine < this.pointsPerLine) {
	// 			// Add to current line
	// 			const isLastCharTab = lines[i].endsWith('\t');
	// 			lines[i] = lines[i] + (isLastCharTab ? childStr : ' ' + childStr);
	// 			pointsInCurrentLine++;
	// 		} else {
	// 			// Start a new line
	// 			i++;
	// 			lines[i] = baseIndent + childStr;
	// 			pointsInCurrentLine = 1;
	// 		}
	// 	}
	//
	// 	return lines.join('\n');
	// }
}
