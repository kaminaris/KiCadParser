import { KicadBoard }     from './KicadBoard';
import { KicadSchematic } from './KicadSchematic';
import { PathUtils }      from './PathUtils';

export class KicadProject {
	name = 'Unnamed';

	projectPath = '';
	mainSchematic?: KicadSchematic;
	mainBoard?: KicadBoard;

	async loadFromPath(
		loadFile: (path: string) => Promise<string>,
		pathUtils: PathUtils,
		schematicPath?: string,
		boardPath?: string
	) {
		if (boardPath) {
			this.mainBoard = new KicadBoard();
			// file name to path
			this.projectPath = pathUtils.dirname(boardPath);
			this.mainBoard.loadFile = loadFile;
			this.mainBoard.pathUtils = pathUtils;

			await this.mainBoard.loadFromPath(boardPath);
		}

		if (schematicPath) {
			this.mainSchematic = new KicadSchematic();
			// file name to path
			this.projectPath = pathUtils.dirname(schematicPath);
			this.mainSchematic.loadFile = loadFile;
			this.mainSchematic.pathUtils = pathUtils;

			await this.mainSchematic.loadFromPath(schematicPath);
		}
	}
}