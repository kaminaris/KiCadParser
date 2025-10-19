export interface PathUtils {
	dirname(filePath: string): string;

	resolve(...paths: string[]): string;

	join(...paths: string[]): string;

	basename(filePath: string, ext?: string): string;

	extname(filePath: string): string;

	isAbsolute(filePath: string): boolean;
}