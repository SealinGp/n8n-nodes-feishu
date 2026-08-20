import fs from 'fs';
import path from 'path';

/**
 * Matches a simple glob pattern (only `*` wildcards, no `**`) against a filename.
 */
const matchesPattern = (fileName: string, pattern: string): boolean => {
	const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '[^/]*');
	return new RegExp(`^${escaped}$`).test(fileName);
};

/**
 * Minimal replacement for `glob.globSync` supporting the patterns this package
 * uses: `*.js`, `dir/*.js`, `dir/sub/*.js`. Kept dependency-free so the
 * published node loads without extra runtime packages.
 */
const findFiles = (cwd: string, expression: string): string[] => {
	const segments = expression.split('/').filter(Boolean);
	if (segments.length === 0) return [];

	const dirSegments = segments.slice(0, -1);
	const filePattern = segments[segments.length - 1];
	const dirPath = path.resolve(cwd, ...dirSegments);

	let entries: fs.Dirent[];
	try {
		entries = fs.readdirSync(dirPath, { withFileTypes: true });
	} catch {
		return [];
	}

	return entries
		.filter((entry) => entry.isFile() && matchesPattern(entry.name, filePattern))
		.map((entry) => [...dirSegments, entry.name].join('/'))
		.sort();
};

class ModuleLoadUtils {
	static loadModules(dirPath: string, expression: string) {
		const files = findFiles(dirPath, expression);

		const modules = [];
		for (const file of files) {
			const fullpath = path.resolve(dirPath, file);
			const filepath = path.relative(__dirname, fullpath);
			const module = require(filepath);
			modules.push({
				...module.default,
			});
		}

		return modules;
	}
}

export default ModuleLoadUtils;
