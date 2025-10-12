import { KicadElement } from './KicadElement';

export type KicadDrillType = 'circle' | 'oval';

export class KicadElementDrill extends KicadElement {
	override name = 'drill';

	type: KicadDrillType = 'circle';
	width?: number;
	height?: number;

	constructor(type?: KicadDrillType, width?: number, height?: number) {
		super();
		if (type === undefined) {
			return;
		}

		this.type = type;
		if (width !== undefined) {
			this.width = width;
		}
		if (height !== undefined) {
			this.height = height;
		}
	}

	override afterParse() {
		if (this.attributes.length > 3) {
			console.log(this);
			throw new Error('Drill element must have 1-3 attributes: type, width, and optional height.');
		}

		if (this.attributes.length === 1) {
			this.width = this.attributes[0]?.value as number;
			this.type = 'circle';
		}

		if (this.attributes.length === 2) {
			this.type = this.attributes[0]?.value as KicadDrillType;
			this.width = this.attributes[1]?.value as number;
		}

		if (this.attributes.length === 3) {
			this.type = this.attributes[0]?.value as KicadDrillType;
			this.width = this.attributes[1]?.value as number;
			this.height = this.attributes[2]?.value as number;
		}
	}

	override write(): string {
		const h = this.height ? ' ' + this.height : '';
		const t = this.type === 'circle' ? '' : ' ' + this.type;
		return this.pad() + `(${ this.name }${t} ${ this.width }${ h })`;
	}
}