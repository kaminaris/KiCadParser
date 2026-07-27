import { WithOrigin }         from './Mixins/WithOrigin';
import { WithUUID }           from './Mixins/WithUUID';
import { KicadElementHide }   from './KicadElementBoolean';
import { KicadElementLength } from './KicadElementNumeric';
import { KicadElementNumber } from './KicadElementNumber';
import { KicadElement }       from './KicadElement';
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

export class KicadElementPin extends WithUUID(WithOrigin(KicadElement)) {
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

	isHidden() {
		const hiddenChild = this.findFirstChildByClass(KicadElementHide);
		if (hiddenChild) {
			return hiddenChild.value;
		}
		// KiCad 8 bare flag: `(pin … hide …)` stores hide as an attribute.
		return this.attributes.some(a => a.value === 'hide' || a.value === true);
	}

	/** KiCad pin hide: `(pin … (hide yes) …)` — direct child, not under effects. */
	setHidden(value: boolean) {
		const found = this.findFirstChildByClass(KicadElementHide);
		if (!value) {
			if (found) {
				const idx = this.children.indexOf(found);
				if (idx >= 0) {
					this.children.splice(idx, 1);
				}
			}
			return;
		}
		if (!found) {
			const hide = new KicadElementHide();
			hide.value = true;
			this.addChild(hide);
			return;
		}
		found.value = true;
	}
}