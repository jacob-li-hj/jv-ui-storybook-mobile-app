const path = require('path');
const glob = require('glob');
const { execSync } = require('child_process');
const babel = require('@babel/core');
const fs = require('fs-extra');
const moduleResolver = require('../module-resolver');

// TODO use library

const cwd = process.cwd();
const entryPath = path.join(cwd, 'src');

const outDir = {
	cjs: 'dist/lib',
	esm: 'dist/esm'
};

const toJSPath = (filePath) => {
	const { root, dir, name } = path.parse(filePath);
	return path.format({ root, dir, name, ext: '.js' });
};

const createDeclarations = (outDir) => {
	const tsconfigPath = path.join(cwd, 'tsconfig.json');
	const options = require(tsconfigPath);
	options.include = ['./src'];
	options.compilerOptions.declaration = true;
	options.compilerOptions.emitDeclarationOnly = true;
	options.compilerOptions.outDir = outDir;
	options.compilerOptions.noEmit = false;
	const original = fs.readFileSync(tsconfigPath, 'utf-8');
	fs.writeFileSync(tsconfigPath, JSON.stringify(options), 'utf-8');
	execSync(`tsc && tsc-alias -p ${tsconfigPath}`);
	fs.writeFileSync(tsconfigPath, original, 'utf-8');
};

const transform = (filePath, format) =>
	babel.transformFileSync(filePath, {
		babelrc: false,
		configFile: false,
		presets: [
			[
				require.resolve('@babel/preset-typescript'),
				{
					isTSX: true,
					allExtensions: true
				}
			],
			require.resolve('@babel/preset-react'),
			[
				require.resolve('@babel/preset-env'),
				{
					modules: format === 'esm' ? false : 'auto',
					targets: {
						browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11']
					}
				}
			]
		],
		plugins: [moduleResolver]
	}).code;

// find match files
const files = glob.sync('src/**/*', {
	cwd,
	nodir: true
});

Object.entries(outDir).forEach(([format, outDir]) => {
	fs.removeSync(outDir);
	// babel transform ts/tsx file
	for (const filePath of files.filter((name) => /\.(ts|tsx|js|jsx)$/.test(name))) {
		const transformedContent = transform(filePath, format);
		const relativePath = path.relative(entryPath, filePath);
		const outPath = toJSPath(path.join(outDir, relativePath));
		fs.outputFileSync(outPath, transformedContent);
	}
	// copy static
	for (const filePath of files.filter((name) => /\.jpg$/.test(name))) {
		const relativePath = path.relative(entryPath, filePath);
		const outPath = path.join(outDir, relativePath);
		fs.copyFileSync(filePath, outPath);
	}
	// create and write ts Declarations
	createDeclarations(outDir);
});
