import { KicadElementHide }   from './KicadElementBoolean';
import { KicadElementLength } from './KicadElementNumeric';
import { KicadElementNumber } from './KicadElementNumber';
import { KicadElement }       from './KicadElement';
import { KicadElementAt }     from './KicadElementAt';
import { KicadElementName }   from './KicadElementName';

export type KicadPinElectricalType = 'input'
	| 'output'
	| 'bidirectional'
	| 'tri_state'
	| 'passive'
	| 'free'
	| 'unspecified'
	| 'power_in'
	| 'power_out'
	| 'open_collector'
	| 'open_emitter'
	| 'no_connect';

export type KicadPinShape = 'line'
	| 'inverted'
	| 'clock'
	| 'inverted_clock'
	| 'input_low'
	| 'clock_low'
	| 'output_low'
	| 'edge_clock_high'
	| 'non_logic';

export class KicadElementPin extends KicadElement {
	override name = 'pin';

	setType(electricalType: KicadPinElectricalType, shape: KicadPinShape) {
		if (this.attributes.length < 1) {
			this.attributes.push({ format: 'literal', value: '' });
		}

		this.attributes[0].value = electricalType;
		this.attributes[0].format = 'literal';

		if (this.attributes.length < 2) {
			this.attributes.push({ format: 'literal', value: '' });
		}

		this.attributes[1].value = shape;
		this.attributes[1].format = 'literal';
	}

	getType(): { electricalType: KicadPinElectricalType, shape: KicadPinShape } {
		const electricalType = (this.attributes[0]?.value ?? 'input') as KicadPinElectricalType;
		const shape = (this.attributes[1]?.value ?? 'line') as KicadPinShape;
		return { electricalType, shape };
	}

	setPin(name?: string, number?: string) {
		if (name !== undefined) {
			const nameEl = this.findOrCreateChildByClass(KicadElementName);
			nameEl.setValue(name);
		}

		if (number !== undefined) {
			const numberEl = this.findOrCreateChildByClass(KicadElementNumber);
			numberEl.setValue(number);
		}
	}

	getPin(): { name: string, number: string } {
		const nameEl = this.findFirstChildByClass(KicadElementName);
		const numberEl = this.findFirstChildByClass(KicadElementNumber);
		return {
			name: nameEl?.getValue() ?? '',
			number: numberEl?.getValue() ?? ''
		};
	}

	setLength(length: number) {
		let found = this.findFirstChildByClass(KicadElementLength);
		if (!found) {
			found = new KicadElementLength();
			this.addChild(found);
		}
		found.value = length;
	}

	getLength(): number {
		const length = this.findFirstChildByClass(KicadElementLength);
		if (!length) {
			return 0;
		}
		return length.value ?? 0;
	}

	setOrigin(x: number, y: number, size?: number) {
		let found = this.findFirstChildByClass(KicadElementAt);
		if (!found) {
			found = new KicadElementAt();
			this.addChild(found);
		}
		found.x = x;
		found.y = y;

		if (size !== undefined) {
			found.rotation = size;
		}
	}

	getOrigin(): { x: number, y: number, rotation: number } {
		const xy = this.findFirstChildByClass(KicadElementAt);
		if (!xy) {
			return { x: 0, y: 0, rotation: 0 };
		}
		return { x: xy.x, y: xy.y, rotation: xy.rotation ?? 0 };
	}

	isHidden() {
		const hiddenChild = this.findFirstChildByClass(KicadElementHide);
		return hiddenChild ? hiddenChild.value : false;
	}
}