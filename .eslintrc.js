module.exports = {
	extends: [require.resolve('@umijs/fabric/dist/eslint')],
	rules: {
		'import/no-cycle':"warn",
		'global-require': 'warn'
	},
	ignorePatterns: ['.eslintrc.js'],
	parserOptions: {
		project: './tsconfig.json'
	}
};
