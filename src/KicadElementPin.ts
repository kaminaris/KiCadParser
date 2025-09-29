import { KicadElementNumber } from './KicadElementNumber';
import { KicadElement }       from './KicadElement';
import { KicadElementAt }     from './KicadElementAt';
import { KicadElementLength } from './KicadElementLength';
import { KicadElementName }   from './KicadElementName';

export class KicadElementPin extends KicadElement {
	override name = 'pin';

	setType(type: string, shape: string) {
		if (this.attributes.length < 1) {
			this.attributes.push({ format: 'literal', value: '' });
		}

		this.attributes[0].value = type;
		this.attributes[0].format = 'literal';

		if (this.attributes.length < 2) {
			this.attributes.push({ format: 'literal', value: '' });
		}

		this.attributes[1].value = shape;
		this.attributes[1].format = 'literal';
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

	setLength(length: number) {
		let found = this.findFirstChildByClass(KicadElementLength);
		if (!found) {
			found = new KicadElementLength();
			this.addChild(found);
		}
		found.value = length;
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
			found.size = size;
		}
	}
}