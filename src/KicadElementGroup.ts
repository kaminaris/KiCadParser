import { WithUUID }     from './Mixins/WithUUID';
import { KicadElement } from './KicadElement';

/**
 * (group ""
 * 		(uuid "4551581e-80e1-43a0-9ceb-574be126799d")
 * 		(members "4249fe56-3eab-49bd-b286-37ed1b29386a" "f5c7fb83-aae0-4f23-a348-3151e911fee8")
 * )
 */
export class KicadElementGroup extends WithUUID(KicadElement) {
	override name = 'group';
	groupName = '';

	override afterParse() {
		if (this.attributes.length > 0) {
			this.groupName = this.attributes[0].value as string ?? '';
			this.attributes.length = 0;
		}
	}

	getMemberUuids(): string[] {
		const members = this.findFirstChildByName('members');
		return members?.attributes.map(a => a.value as string) ?? [];
	}

	setMemberUuids(uuids: string[]) {
		const members = this.findOrCreateChildByName('members');
		members.attributes = uuids.map(value => ({ value, format: 'quoted' as const }));
	}

	override write(): string {
		const attrStr = ` "${ this.escapeString(this.groupName) }"`;

		if (this.children.length === 0) {
			return this.pad() + `(${ this.name }${ attrStr })`;
		}

		return this.pad() + `(${ this.name }${ attrStr }\n${ this.writeChildren() }\n${ this.pad() })`;
	}
}
