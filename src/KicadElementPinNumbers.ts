import { KicadElementHide } from './KicadElementBoolean';
import { KicadElement }     from './KicadElement';

export class KicadElementPinNumbers extends KicadElement {
	value: string = 'pin_numbers';

	isHidden(): boolean {
		const hideChild = this.findFirstChildByClass(KicadElementHide);
		return hideChild ? hideChild.value : false;
	}

}