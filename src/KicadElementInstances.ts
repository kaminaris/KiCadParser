import { KicadElementReference } from './KicadElementString';
import { KicadElementUnit }      from './KicadElementNumeric';
import { KicadElement }          from './KicadElement';

/**
 * A single per-project reference/unit assignment for a symbol or footprint:
 *
 * (path "/0468a8f0-.../e6d9898f-..."
 * 		(reference "#PWR054")
 * 		(unit 1)
 * )
 *
 * Also used, identically but without children, as a footprint's own sheet path:
 * (path "/0b94020d-82ee-4abc-ba5f-7e0cbe58e2cd/23a9e628-a0ce-409c-8342-658ae7d1ba2a")
 */
export class KicadElementInstancePath extends KicadElement {
	override name = 'path';
	pathValue?: string;

	constructor(pathValue?: string, reference?: string, unit?: number) {
		super();
		if (pathValue !== undefined) {
			this.pathValue = pathValue;
		}
		if (reference !== undefined) {
			this.setReference(reference);
		}
		if (unit !== undefined) {
			this.setUnit(unit);
		}
	}

	override afterParse() {
		if (this.attributes.length > 0) {
			this.pathValue = this.attributes[0].value as string;
			this.attributes.splice(0, 1);
		}
	}

	setReference(reference: string): this {
		this.findOrCreateChildByClass(KicadElementReference).value = reference;
		return this;
	}

	getReference(): string {
		return this.findFirstChildByClass(KicadElementReference)?.value ?? '';
	}

	setUnit(unit: number): this {
		this.findOrCreateChildByClass(KicadElementUnit).value = unit;
		return this;
	}

	getUnit(): number {
		return this.findFirstChildByClass(KicadElementUnit)?.value ?? 0;
	}

	override write(): string {
		const attrStr = this.pathValue !== undefined ? ` "${ this.escapeString(this.pathValue) }"` : '';

		if (this.children.length === 0) {
			return this.pad() + `(${ this.name }${ attrStr })`;
		}

		return this.pad() + `(${ this.name }${ attrStr }\n${ this.writeChildren() }\n${ this.pad() })`;
	}
}

/**
 * (project "DevKitX2-Castellated6L"
 * 		(path "..." (reference "#PWR054") (unit 1))
 * )
 */
export class KicadElementInstanceProject extends KicadElement {
	override name = 'project';
	projectName?: string;

	constructor(projectName?: string) {
		super();
		if (projectName !== undefined) {
			this.projectName = projectName;
		}
	}

	override afterParse() {
		if (this.attributes.length > 0) {
			this.projectName = this.attributes[0].value as string;
			this.attributes.splice(0, 1);
		}
	}

	getPaths(): KicadElementInstancePath[] {
		return this.findChildrenByClass(KicadElementInstancePath);
	}

	addPath(pathValue: string, reference?: string, unit?: number): KicadElementInstancePath {
		const path = new KicadElementInstancePath(pathValue, reference, unit);
		this.addChild(path);
		return path;
	}

	override write(): string {
		const attrStr = this.projectName !== undefined ? ` "${ this.escapeString(this.projectName) }"` : '';

		if (this.children.length === 0) {
			return this.pad() + `(${ this.name }${ attrStr })`;
		}

		return this.pad() + `(${ this.name }${ attrStr }\n${ this.writeChildren() }\n${ this.pad() })`;
	}
}

/**
 * (instances
 * 		(project "DevKitX2-Castellated6L" (path "..." (reference "#PWR054") (unit 1)))
 * 		(project "DevKitX2" (path "..." (reference "#PWR054") (unit 1)))
 * )
 *
 * Example - registering a newly-placed symbol's instance data:
 *
 * const instances = symbol.findOrCreateChildByClass(KicadElementInstances);
 * instances.addProject('MyProject').addPath('/<sheet-uuid>/<symbol-uuid>', 'R1', 1);
 */
export class KicadElementInstances extends KicadElement {
	override name = 'instances';

	getProjects(): KicadElementInstanceProject[] {
		return this.findChildrenByClass(KicadElementInstanceProject);
	}

	addProject(projectName: string): KicadElementInstanceProject {
		const project = new KicadElementInstanceProject(projectName);
		this.addChild(project);
		return project;
	}
}
