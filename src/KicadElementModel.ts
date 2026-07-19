import { KicadElementOffset, KicadElementRotate, KicadElementScale } from './KicadElementOffset';
import { KicadElement } from './KicadElement';

/**
 * (model "${KICAD10_3DMODEL_DIR}/Capacitor_SMD.3dshapes/C_0402_1005Metric.step"
 * 		(offset (xyz 0 0 0))
 * 		(scale (xyz 1 1 1))
 * 		(rotate (xyz 0 0 0))
 * )
 */
export class KicadElementModel extends KicadElement {
	override name = 'model';
	modelPath?: string;

	constructor(modelPath?: string) {
		super();
		if (modelPath !== undefined) {
			this.modelPath = modelPath;
		}
	}

	override afterParse() {
		if (this.attributes.length > 0) {
			this.modelPath = this.attributes[0].value as string;
			this.attributes.splice(0, 1);
		}
	}

	setOffset(x: number, y: number, z: number): this {
		this.findOrCreateChildByClass(KicadElementOffset).setXYZ(x, y, z);
		return this;
	}

	setScale(x: number, y: number, z: number): this {
		this.findOrCreateChildByClass(KicadElementScale).setXYZ(x, y, z);
		return this;
	}

	setRotate(x: number, y: number, z: number): this {
		this.findOrCreateChildByClass(KicadElementRotate).setXYZ(x, y, z);
		return this;
	}

	getOffset() {
		return this.findFirstChildByClass(KicadElementOffset)?.getXYZ();
	}

	getScale() {
		return this.findFirstChildByClass(KicadElementScale)?.getXYZ();
	}

	getRotate() {
		return this.findFirstChildByClass(KicadElementRotate)?.getXYZ();
	}

	/**
	 * Build a model block with KiCad's usual identity offset/scale/rotate,
	 * ready to drop into a footprint: `footprint.addChild(KicadElementModel.create(path))`.
	 */
	static create(modelPath: string): KicadElementModel {
		return new KicadElementModel(modelPath)
			.setOffset(0, 0, 0)
			.setScale(1, 1, 1)
			.setRotate(0, 0, 0);
	}

	override write(): string {
		const attrStr = this.modelPath !== undefined ? ` "${ this.escapeString(this.modelPath) }"` : '';

		if (this.children.length === 0) {
			return this.pad() + `(${ this.name }${ attrStr })`;
		}

		return this.pad() + `(${ this.name }${ attrStr }\n${ this.writeChildren() }\n${ this.pad() })`;
	}
}
