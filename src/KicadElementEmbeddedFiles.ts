import { KicadElement } from './KicadElement';

/**
 * KiCad footprint / board embedded binary payload (3D models, fonts, …).
 *
 * 	(embedded_fonts no)
 * 	(embedded_files
 * 		(file
 * 			(name "Part.step")
 * 			(type model)
 * 			(data |…base64…|)
 * 			(checksum "…")
 * 		)
 * 	)
 */
export class KicadElementEmbeddedFiles extends KicadElement {
	override name = 'embedded_files';

	files: Array<{
		name: string;
		type: 'model' | 'font' | 'datasheet' | 'worksheet' | 'other';
		/** Continuous Base64 (no whitespace). */
		dataBase64: string;
		checksum: string;
	}> = [];

	addModelFile(name: string, dataBase64: string, checksum: string): this {
		this.files.push({ name, type: 'model', dataBase64, checksum });
		return this;
	}

	override write(): string {
		if (this.files.length === 0) {
			return '';
		}

		const pad = this.pad();
		const inner = this.pad(1);
		const dataIndent = this.pad(2);
		const parts: string[] = [`${ pad }(${ this.name }`];

		for (const file of this.files) {
			const b64 = file.dataBase64.replace(/\s+/g, '');
			parts.push(`${ inner }(file`);
			parts.push(`${ dataIndent }(name "${ this.escapeString(file.name) }")`);
			parts.push(`${ dataIndent }(type ${ file.type })`);
			// Match pcbnew / reference .kicad_mod: `(data` then MIME-76 lines with `|…|`.
			parts.push(`${ dataIndent }(data`);
			parts.push(formatDataLines(b64, this.pad(3)));
			parts.push(`${ dataIndent })`);
			parts.push(`${ dataIndent }(checksum "${ this.escapeString(file.checksum) }")`);
			parts.push(`${ inner })`);
		}

		parts.push(`${ pad })`);
		return parts.join('\n');
	}
}

/** `(embedded_fonts no)` — written before embedded_files on footprints. */
export class KicadElementEmbeddedFonts extends KicadElement {
	override name = 'embedded_fonts';
	enabled = false;

	override write(): string {
		return `${ this.pad() }(${ this.name } ${ this.enabled ? 'yes' : 'no' })`;
	}
}

const MIME_BASE64_LINE = 76;

function formatDataLines(dataBase64: string, indent: string): string {
	const lines: string[] = [];
	for (let i = 0; i < dataBase64.length; i += MIME_BASE64_LINE) {
		const chunk = dataBase64.slice(i, i + MIME_BASE64_LINE);
		const isFirst = i === 0;
		const isLast = i + MIME_BASE64_LINE >= dataBase64.length;
		if (isFirst && isLast) {
			lines.push(`${ indent }|${ chunk }|`);
		}
		else if (isFirst) {
			lines.push(`${ indent }|${ chunk }`);
		}
		else if (isLast) {
			lines.push(`${ indent }${ chunk }|`);
		}
		else {
			lines.push(`${ indent }${ chunk }`);
		}
	}
	return lines.join('\n');
}
