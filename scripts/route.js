const path = require('path');
const { readdirSync, readFileSync, outputFileSync } = require('fs-extra');

const cwd = process.cwd();

const routes = ['Atoms', 'Experiences', 'Molecules', 'Organisms', 'Welcome'];

const toStoryName = (fileName) =>
	path.parse(fileName.replace(/([A-Z])/g, ($0) => ' ' + $0).trim()).name;

const readDir = (dir) =>
	readdirSync(dir, { withFileTypes: true }).map((current) => {
		const currentPath = path.join(dir, current.name);
		if (current.isDirectory()) {
			return {
				...current,
				children: readDir(currentPath)
			};
		}

		const fileContent = readFileSync(path.join(cwd, currentPath), 'utf-8');
		const components = fileContent.match(/(?<=export\sconst\s)(\w*)?/g);

		return {
			name: toStoryName(current.name),
			children: components?.map((component) => ({
				name: `require('${path.join(cwd, currentPath)}').${component}.storyName || '${component}'`,
				component: `require('${path.join(cwd, currentPath)}').${component}`
			}))
		};
	});

const renderRoutes = readDir('./stories').filter(({ name }) => routes.includes(name));

const routeConfig =
	'export default ' +
	JSON.stringify(renderRoutes, null, 4)
		.replace(
			/\"name\": (\"(require.+?)\")/g,
			(global, m1, m2) => `"name": ${m2.replace(/\^/g, '"')}`
		)
		.replace(
			/\"component\": (\"(.+?)\")/g,
			(global, m1, m2) => `"component": ${m2.replace(/\^/g, '"')}`
		)
		.replace(/\\r\\n/g, '\r\n')
		.replace(/\\n/g, '\r\n');

outputFileSync('./storyLoader.ts', routeConfig, 'utf-8');
