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
	};
}