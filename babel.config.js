const moduleResolver = require('./module-resolver');

module.exports = (api) => {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [moduleResolver]
	};
};
