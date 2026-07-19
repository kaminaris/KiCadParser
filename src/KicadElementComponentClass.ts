import { KicadElement } from './KicadElement';

/**
 * KiCad 10's multichannel/component-class feature uses two related but
 * distinct tag shapes:
 *
 * Footprint-level, a container listing the class(es) a footprint belongs to:
 * (component_classes (class "Comp3"))
 *
 * Board zone/placement-level, the single class name a PCB auto-placement
 * rule area (created for a multichannel sheet) targets:
 * (zone (placement (enabled yes) (component_class "Comp2")))
 */
export class KicadElementComponentClasses extends KicadElement {
	override name = 'component_classes';

	getClassNames(): string[] {
		return this.findChildrenByName('class')
			.map(c => c.attributes[0]?.value as string)
			.filter((v): v is string => !!v);
	}

	addClass(name: string) {
		const child = new KicadElement();
		child.name = 'class';
		child.attributes.push({ value: name, format: 'quoted' });
		this.addChild(child);
	}
}

export class KicadElementComponentClass extends KicadElement {
	override name = 'component_class';
	className = '';

	override afterParse() {
		if (this.attributes.length > 0) {
			this.className = this.attributes[0].value as string ?? '';
			this.attributes.length = 0;
		}
	}

	override write(): string {
		return this.pad() + `(${ this.name } "${ this.escapeString(this.className) }")`;
	}
}
