import { Ctor }                 from './Ctor';
import { KicadElementProperty } from '../KicadElementProperty';
import { KicadElement }         from '../KicadElement';

export function WithProperties<T extends Ctor<KicadElement>>(Base: T) {
	return class extends Base {
		getProperties(): KicadElementProperty[] {
			return this.findChildrenByClass(KicadElementProperty);
		}

		getAllProperties(): Record<string, string> {
			const props: Record<string, string> = {};
			for (const child of this.children) {
				if (child instanceof KicadElementProperty) {
					props[child.propertyName!] = child.propertyValue!;
				}
			}
			return props;
		}

		getVisibleProperties(): Record<string, KicadElementProperty> {
			const props: Record<string, KicadElementProperty> = {};
			for (const child of this.children) {
				if (child instanceof KicadElementProperty) {
					if (child.isHidden()) {
						continue;
					}
					props[child.propertyName!] = child;
				}
			}
			return props;
		}

		getPropertyByName(name: string): KicadElementProperty | undefined {
			return this.children.find(
				c => c instanceof KicadElementProperty && c.propertyName === name) as KicadElementProperty | undefined;
		}

		setProperty(name: string, value: string) {
			let prop = this.children.find(
				c => c instanceof KicadElementProperty && c.propertyName === name) as KicadElementProperty | undefined;
			if (!prop) {
				prop = new KicadElementProperty(name, value);
				this.children.push(prop);
			}
			else {
				prop.propertyValue = value;
			}
		}

		/** Removes a property child by exact name — no-op if not found. Used
		 *  by the Fields grid's row-delete action; real KiCad guards its own
		 *  mandatory fields (Reference/Value/Footprint/Datasheet) from
		 *  deletion at the UI layer, same as this app does at its call site,
		 *  not here (this method itself is unconditional, matching every
		 *  other delete-by-identity method in this codebase). */
		deleteProperty(name: string) {
			const idx = this.children.findIndex(c => c instanceof KicadElementProperty && c.propertyName === name);
			if (idx >= 0) {
				this.children.splice(idx, 1);
			}
		}
	};
}