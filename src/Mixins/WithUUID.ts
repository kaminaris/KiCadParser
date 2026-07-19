import { Ctor }              from './Ctor';
import { KicadElementUUID }  from '../KicadElementUUID';
import { KicadElement }      from '../KicadElement';

export function WithUUID<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		getUuid(): string | undefined {
			return this.findFirstChildByClass(KicadElementUUID)?.uuid;
		}

		setUuid(uuid?: string) {
			this.findOrCreateChildByClass(KicadElementUUID).uuid = uuid ?? crypto.randomUUID();
		}
	};
}
