import { KicadElement } from './KicadElement';

export type KicadLayerType = 'signal' | 'power' | 'mixed' | 'jumper' | 'user' | 'front' | 'back';

export interface KicadLayerDefinition {
	id: number;
	name: string;
	type: KicadLayerType; // TODO: not sure if this is complete
	alias?: string;
}

export class KicadElementLayers extends KicadElement {
	override name = 'layers';
	layers: KicadLayerDefinition[] = [];

	override afterParse() {
		for (const child of this.children) {
			const id = +child.name;
			if (isNaN(id) || id < 0) {
				continue;
			}
			if (child.attributes.length < 2) {
				throw new Error(`Layer ${ id } must have at least 2 attributes (name and type).`);
			}
			const nameAttr = child.attributes[0];
			const typeAttr = child.attributes[1];
			const aliasAttr = child.attributes.length > 2 ? child.attributes[2] : undefined;
			if (typeof nameAttr.value !== 'string' || typeof typeAttr.value !== 'string') {
				throw new Error(`Layer ${ id } name and type must be strings.`);
			}
			const layer: KicadLayerDefinition = {
				id,
				name: nameAttr.value as string,
				type: typeAttr.value as KicadLayerType
			};
			if (aliasAttr && typeof aliasAttr.value === 'string') {
				layer.alias = aliasAttr.value as string;
			}
			this.layers.push(layer);
		}

		this.children.length = 0;
	}

	writeLayers(): string {
		let result = '';
		for (const layer of this.layers) {
			result += this.pad(1) + `(${ layer.id } "${ layer.name }" ${ layer.type }`;
			if (layer.alias) {
				result += ` "${ layer.alias }"`;
			}
			result += ')\n';
		}
		return result;
	}

	override write(): string {
		const attrs = this.formatAttributes();

		const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

		if (this.children.length === 0 && this.layers.length === 0) {
			return this.pad() + `(${ this.name }${ attrStr })`;
		}

		let result = this.pad() + `(${ this.name }${ attrStr }`;
		if (this.layers.length > 0) {
			result += '\n' + this.writeLayers();
		}
		if (this.children.length > 0) {
			result += '\n' + this.writeChildren();
		}
		result += this.pad() + ')';
		return result;
	}

	getLayerByName(layer1: any) {
		return this.layers.find(l => l.name === layer1 || l.alias === layer1);
	}
}