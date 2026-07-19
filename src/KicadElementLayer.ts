import { KicadElementColor }     from './KicadElementColor';
import { KicadElementThickness } from './KicadElementNumeric';
import { KicadElementType }      from './KicadElementType';
import { KicadElement }          from './KicadElement';

export class KicadElementLayer extends KicadElement {
	override name = 'layer';

	constructor(layerName?: string) {
		super();
		if (layerName !== undefined) {
			this.attributes.push({ value: layerName, format: 'quoted' });
		}
	}

	getLayerName(): string {
		if (this.attributes.length < 1) {
			throw new Error(`${ this.name } expects exactly one attribute, got ${ this.attributes.length }`);
		}
		return this.attributes[0].value as string ?? '';
	}

	/**
	 * The following are only meaningful on a stackup layer entry, i.e.
	 * `(setup (stackup (layer "F.Cu" (type "copper") (thickness 0.035) ...)))`.
	 */
	setStackupType(type: string): this {
		this.findOrCreateChildByClass(KicadElementType).setAttribute({ value: type, format: 'quoted' }, 0);
		return this;
	}

	getStackupType(): string | undefined {
		return this.findFirstChildByClass(KicadElementType)?.attributes[0]?.value as string;
	}

	setThickness(mm: number): this {
		this.findOrCreateChildByClass(KicadElementThickness).value = mm;
		return this;
	}

	getThickness(): number | undefined {
		return this.findFirstChildByClass(KicadElementThickness)?.value;
	}

	setMaterial(material: string): this {
		this.setSimpleChild('material', material, 'quoted');
		return this;
	}

	getMaterial(): string | undefined {
		return this.getSimpleChildValue('material') as string | undefined;
	}

	setEpsilonR(value: number): this {
		this.setSimpleChild('epsilon_r', value, 'numeric');
		return this;
	}

	getEpsilonR(): number | undefined {
		return this.getSimpleChildValue('epsilon_r') as number | undefined;
	}

	setLossTangent(value: number): this {
		this.setSimpleChild('loss_tangent', value, 'numeric');
		return this;
	}

	getLossTangent(): number | undefined {
		return this.getSimpleChildValue('loss_tangent') as number | undefined;
	}

	setStackupColor(color: string): this {
		this.findOrCreateChildByClass(KicadElementColor).setColorName(color);
		return this;
	}

	getStackupColor(): string | undefined {
		return this.findFirstChildByClass(KicadElementColor)?.getColor();
	}
}
