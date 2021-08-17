const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const svgr = require('@svgr/core').default;

const cwd = process.cwd();
const source = path.join(cwd, 'assets/icons');
const outputPath = path.join(cwd, 'src', 'components', 'global', 'Icon');

const svgFiles = glob.sync('**/*.svg', {
	cwd: source,
	absolute: true
});

const svgrConfig = {
	native: true,
	typescript: true,
	replaceAttrValues: {
		'#595454': 'currentColor'
	},
	plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
	svgoConfig: {
		plugins: [
			{
				inlineStyles: {
					onlyMatchedOnce: false
				}
			},
			{
				removeViewBox: false
			},
			{
				removeUnknownsAndDefaults: false
			},
			{
				convertColors: false
			}
		]
	}
};

console.log(`transforming ${svgFiles.length} svg file with svgr....`);

const header = '// GENERATE BY scripts/icon.js\n' + '// DON NOT EDIT IT MANUALLY\n';
const iconNames = [];
svgFiles.forEach((svgFilePath) => {
	const svgContent = fs.readFileSync(svgFilePath, 'utf-8');
	const baseName = path.basename(svgFilePath, '.svg');
	const svgName = baseName
		// uppercase first letter
		.replace(/^\w/, ($0) => $0.toUpperCase())
		// uppercase letter after -,(
		.replace(/(?<=[-(])\s*(\w)/g, ($0) => $0.toUpperCase())
		// replace symbol
		.replace(/[\s()+-]/g, '');
	console.log(`transforming ${baseName}.svg => ${svgName}`);
	const result =
		'// @ts-nocheck\n' +
		header +
		svgr.sync(svgContent, svgrConfig, {
			componentName: svgName
		});
	fs.outputFileSync(path.join(outputPath, `${svgName}.tsx`), result, 'utf-8');
	iconNames.push(svgName);
});

const iconsImport = iconNames.reduce((imports, icon) => {
	imports += `import ${icon} from './${icon}';\n`;
	return imports;
}, '');

const iconsTypes = iconNames.reduce((types, icon) => {
	types += `\t| '${icon}'\n`;
	return types;
}, 'export type IconName =\n');

const iconsMap =
	iconNames.reduce((types, icon) => {
		types += `\t${icon},\n`;
		return types;
	}, 'export const iconsMap = {\n') + '}\n';

fs.outputFileSync(
	path.join(outputPath, `Icons.tsx`),
	`${header}
${iconsImport}
${iconsTypes}
${iconsMap}`
);

fs.outputFileSync(
	path.join(outputPath, `IconNames.ts`),
	iconNames.reduce((names, icon) => {
		names += `\t'${icon}',\n`;
		return names;
	}, 'export default [\n') + '] as const;\n'
);

console.log(`transform success!`);
