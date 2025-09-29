import { KicadElementComment }          from './KicadElementComment';
import {
	KicadElementDashedLineDashRatio, KicadElementDashedLineGapRatio, KicadElementHpglPenDiameter
}                                       from './KicadElementNumericFixed';
import {
	KicadElementCompany, KicadElementDate, KicadElementRev, KicadElementTitle
}                                       from './KicadElementString';
import {
	KicadElementTitleBlock
}                                       from './KicadElementTitleBlock';
import { KicadElementBold }             from './KicadElementBold';
import { KicadElementFace }             from './KicadElementFace';
import { KicadElementItalic }           from './KicadElementItalic';
import { KicadElementThickness }        from './KicadElementThickness';
import { KicadElementFill }             from './KicadElementFill';
import { KicadElementEnd }              from './KicadElementEnd';
import { KicadElementFootprint }        from './KicadElementFootprint';
import { KicadElementGenerator }        from './KicadElementGenerator';
import { KicadElementGeneratorVersion } from './KicadElementGeneratorVersion';
import { KicadElementLayer }            from './KicadElementLayer';
import { KicadElementName }             from './KicadElementName';
import { KicadElementNet }              from './KicadElementNet';
import { KicadElementNumber }           from './KicadElementNumber';
import { KicadElementPolygon }          from './KicadElementPolygon';
import { KicadElementRectangle }        from './KicadElementRectangle';
import { KicadElementStart }            from './KicadElementStart';
import { KicadElementSymbolLib }        from './KicadElementSymbolLib';
import { KicadElementUnlocked }         from './KicadElementUnlocked';
import { KicadElementVersion }          from './KicadElementVersion';
import { KicadElementAt }               from './KicadElementAt';
import { KicadElementColor }            from './KicadElementColor';
import { KicadElementData }             from './KicadElementData';
import { KicadElementDiameter }         from './KicadElementDiameter';
import { KicadElementDnp }              from './KicadElementDnp';
import { KicadElementEffects }          from './KicadElementEffects';
import { KicadElementFieldsAutoplaced } from './KicadElementFieldsAutoplaced';
import { KicadElementFont }             from './KicadElementFont';
import { KicadElementHide }             from './KicadElementHide';
import { KicadElementInBom }            from './KicadElementInBom';
import { KicadElementExcludeFromSim }   from './KicadElementExcludeFromSim';
import { KicadElementJustify }          from './KicadElementJustify';
import { KicadElementLength }           from './KicadElementLength';
import { KicadElementLibId }            from './KicadElementLibId';
import { KicadElementLibSymbols }       from './KicadElementLibSymbols';
import { KicadElementOffset }           from './KicadElementOffset';
import { KicadElementOnBoard }          from './KicadElementOnBoard';
import { KicadElementPin }              from './KicadElementPin';
import { KicadElementProperty }         from './KicadElementProperty';
import { KicadElementPts }              from './KicadElementPts';
import { KicadElementRadius }           from './KicadElementRadius';
import { KicadElementReference }        from './KicadElementReference';
import { KicadElementSheet }            from './KicadElementSheet';
import { KicadElementSize }             from './KicadElementSize';
import { KicadElementStroke }           from './KicadElementStroke';
import { KicadElementSymbol }           from './KicadElementSymbol';
import { KicadElementType }             from './KicadElementType';
import { KicadElementUnit }             from './KicadElementUnit';
import { KicadElementUUID }             from './KicadElementUUID';
import { KicadElementWidth }            from './KicadElementWidth';
import { KicadElementXY }               from './KicadElementXY';
import { KicadElement }                 from './KicadElement';

export type KicadToken = { type: 'paren' | 'string' | 'number' | 'symbol', value: string };

export class KicadParser {
	tokens: KicadToken[] = [];
	i: number = 0;

	nodeMap: { [key: string]: any } = {
		'uuid': KicadElementUUID,
		'type': KicadElementType,
		'pts': KicadElementPts,
		'symbol': KicadElementSymbol,
		'footprint': KicadElementFootprint,
		'polygon': KicadElementPolygon,
		'sheet': KicadElementSheet,
		'net': KicadElementNet,
		'lib_symbols': KicadElementLibSymbols,
		'kicad_symbol_lib': KicadElementSymbolLib,
		'width': KicadElementWidth,
		'offset': KicadElementOffset,
		'size': KicadElementSize,
		/** Points and coordinates */
		'start': KicadElementStart,
		'end': KicadElementEnd,
		'at': KicadElementAt,
		'xy': KicadElementXY,
		'unit': KicadElementUnit,
		/** numbers */
		'number': KicadElementNumber,
		'version': KicadElementVersion,
		'diameter': KicadElementDiameter,
		'thickness': KicadElementThickness,
		'radius': KicadElementRadius,
		'length': KicadElementLength,
		'color': KicadElementColor,
		'data': KicadElementData,
		/** Fixed precision numbers, not sure if it is intended */
		'dashed_line_dash_ratio': KicadElementDashedLineDashRatio,
		'dashed_line_gap_ratio': KicadElementDashedLineGapRatio,
		'hpglpendiameter': KicadElementHpglPenDiameter,

		/** Strings */
		'name': KicadElementName,
		'title': KicadElementTitle,
		'date': KicadElementDate,
		'rev': KicadElementRev,
		'company': KicadElementCompany,
		'comment': KicadElementComment,
		'title_block': KicadElementTitleBlock,
		'face': KicadElementFace,
		'layer': KicadElementLayer,
		'generator': KicadElementGenerator,
		'generator_version': KicadElementGeneratorVersion,
		'lib_id': KicadElementLibId,
		'reference': KicadElementReference,
		'font': KicadElementFont,
		'effects': KicadElementEffects,
		'justify': KicadElementJustify,
		'stroke': KicadElementStroke,
		'fill': KicadElementFill,
		'property': KicadElementProperty,
		/** Booleans and flags */
		'bold': KicadElementBold,
		'italic': KicadElementItalic,
		'dnp': KicadElementDnp,
		'in_bom': KicadElementInBom,
		'on_board': KicadElementOnBoard,
		'exclude_from_sim': KicadElementExcludeFromSim,
		'fields_autoplaced': KicadElementFieldsAutoplaced,
		'unlocked': KicadElementUnlocked,
		'hide': KicadElementHide,
		'pin': KicadElementPin,
		'rectangle': KicadElementRectangle
	};

	tokenizeKicad(text: string): KicadToken[] {
		const regex = /\(|\)|"((?:\\"|[^"])*)"|[^\s()"]+/g;
		const tokens: KicadToken[] = [];
		let match;
		while ((match = regex.exec(text)) !== null) {
			if (match[0] === '(' || match[0] === ')') {
				tokens.push({ type: 'paren', value: match[0] });
			}
			else if (match[1] !== undefined) {
				// Replace escaped quotes with actual quotes in the stored value
				const stringValue = match[1].replace(/\\"/g, '"');
				tokens.push({ type: 'string', value: stringValue });
			}
			else if (!isNaN(Number(match[0]))) {
				tokens.push({ type: 'number', value: match[0] });
			}
			else {
				tokens.push({ type: 'symbol', value: match[0] });
			}
		}
		return tokens;
	}

	newElement(name: string): KicadElement {
		let el: KicadElement;

		if (name in this.nodeMap) {
			const Cls = this.nodeMap[name];
			el = new Cls();
		}
		else {
			el = new KicadElement();
		}

		el.name = name;
		return el;
	}

	parseElement(): KicadElement {
		if (this.tokens[this.i].type === 'paren' && this.tokens[this.i].value === '(') {
			this.i++;
			const nameToken = this.tokens[this.i++];
			const element = this.newElement(nameToken.value);

			// Parse attributes and children
			while (this.i < this.tokens.length &&
			!(this.tokens[this.i].type === 'paren' && this.tokens[this.i].value === ')')) {
				// If next token is an opening parenthesis, it's a child element
				if (this.tokens[this.i].type === 'paren' && this.tokens[this.i].value === '(') {
					element.addChild(this.parseElement());
				}
				// Otherwise it's an attribute - preserve type
				else {
					const token = this.tokens[this.i];
					if (token.type === 'string') {
						// Store as string with quoted format
						element.attributes.push({
							value: token.value,
							format: 'quoted'
						});
					}
					else if (token.type === 'number') {
						// Store as actual number with numeric format
						element.attributes.push({
							value: Number(token.value),
							format: 'numeric'
						});
					}
					else if (token.value === 'yes' || token.value === 'no') {
						// Handle boolean values
						element.attributes.push({
							value: token.value === 'yes',
							format: 'boolean'
						});
					}
					else {
						// Other symbols remain as strings with literal format
						element.attributes.push({
							value: token.value,
							format: 'literal'
						});
					}
					this.i++;
				}
			}

			element.afterParse();
			this.i++; // skip ')'
			return element;
		}
		else if (this.tokens[this.i].type === 'string') {
			const element = this.newElement(this.tokens[this.i++].value);
			return element;
		}
		else {
			const element = this.newElement(this.tokens[this.i++].value);
			return element;
		}
	}

	parseKicad(tokens: KicadToken[]): KicadElement {
		this.tokens = tokens;
		this.i = 0;
		return this.parseElement();
	}

	parse(text: string): KicadElement {
		const tokens = this.tokenizeKicad(text);
		return this.parseKicad(tokens);
	}
}
