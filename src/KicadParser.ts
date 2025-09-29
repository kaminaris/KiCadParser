import { KicadElementBold }             from 'src/app/Lib/Kicad/src/KicadElementBold';
import { KicadElementFace }             from 'src/app/Lib/Kicad/src/KicadElementFace';
import { KicadElementItalic }           from 'src/app/Lib/Kicad/src/KicadElementItalic';
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
	private tokens: KicadToken[] = [];
	private i: number = 0;

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
		switch (name) {
			case 'uuid':
				el = new KicadElementUUID();
				break;
			case 'type':
				el = new KicadElementType();
				break;
			case 'pts':
				el = new KicadElementPts();
				break;
			case 'symbol':
				el = new KicadElementSymbol();
				break;
			case 'footprint':
				el = new KicadElementFootprint();
				break;
			case 'polygon':
				el = new KicadElementPolygon();
				break;
			case 'sheet':
				el = new KicadElementSheet();
				break;
			case 'net':
				el = new KicadElementNet();
				break;
			case 'lib_symbols':
				el = new KicadElementLibSymbols();
				break;
			case 'kicad_symbol_lib':
				el = new KicadElementSymbolLib();
				break;
			case 'width':
				el = new KicadElementWidth();
				break;
			case 'offset':
				el = new KicadElementOffset();
				break;
			case 'size':
				el = new KicadElementSize();
				break;
			/** Points and coordinates */
			case 'start':
				el = new KicadElementStart();
				break;
			case 'end':
				el = new KicadElementEnd();
				break;
			case 'at':
				el = new KicadElementAt();
				break;
			case 'xy':
				el = new KicadElementXY();
				break;
			case 'unit':
				el = new KicadElementUnit();
				break;
			/** numbers */
			case 'number':
				el = new KicadElementNumber();
				break;
			case 'version':
				el = new KicadElementVersion();
				break;
			case 'diameter':
				el = new KicadElementDiameter();
				break;
			case 'thickness':
				el = new KicadElementThickness();
				break;
			case 'radius':
				el = new KicadElementRadius();
				break;
			case 'length':
				el = new KicadElementLength();
				break;
			case 'color':
				el = new KicadElementColor();
				break;
			case 'data':
				el = new KicadElementData();
				break;
			/** Strings */
			case 'name':
				el = new KicadElementName();
				break;
			case 'face':
				el = new KicadElementFace();
				break;
			case 'layer':
				el = new KicadElementLayer();
				break;
			case 'generator':
				el = new KicadElementGenerator();
				break;
			case 'generator_version':
				el = new KicadElementGeneratorVersion();
				break;
			case 'lib_id':
				el = new KicadElementLibId();
				break;
			case 'reference':
				el = new KicadElementReference();
				break;
			case 'font':
				el = new KicadElementFont();
				break;
			case 'effects':
				el = new KicadElementEffects();
				break;
			case 'justify':
				el = new KicadElementJustify();
				break;
			case 'stroke':
				el = new KicadElementStroke();
				break;
			case 'fill':
				el = new KicadElementFill();
				break;
			case 'property':
				el = new KicadElementProperty();
				break;
			/** Booleans and flags */
			case 'bold':
				el = new KicadElementBold();
				break;
			case 'italic':
				el = new KicadElementItalic();
				break;
			case 'dnp':
				el = new KicadElementDnp();
				break;
			case 'in_bom':
				el = new KicadElementInBom();
				break;
			case 'on_board':
				el = new KicadElementOnBoard();
				break;
			case 'exclude_from_sim':
				el = new KicadElementExcludeFromSim();
				break;
			case 'fields_autoplaced':
				el = new KicadElementFieldsAutoplaced();
				break;
			case 'unlocked':
				el = new KicadElementUnlocked();
				break;
			case 'hide':
				el = new KicadElementHide();
				break;
			case 'pin':
				el = new KicadElementPin();
				break;
			case 'rectangle':
				el = new KicadElementRectangle();
				break;
			default:
				el = new KicadElement();
				break;
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
