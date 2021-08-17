const fabric = require('@umijs/fabric');

module.exports = {
	...fabric.prettier,
	trailingComma: 'none',
	tabWidth: 2,
	semi: true,
	singleQuote: true,
	useTabs: true
};
