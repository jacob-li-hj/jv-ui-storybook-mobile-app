module.exports = [
	'babel-plugin-module-resolver',
	{
		root: [__dirname],
		alias: {
			'@basic': './basic',
			'@components': './src/components',
			'@themes': './src/themes',
			'@hooks': './src/hooks'
		}
	}
];
