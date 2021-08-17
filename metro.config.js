const { execSync } = require('child_process');

module.exports = {
	reporter: {
		update: ({ type }) => {
			if (type === 'initialize_started') {
				console.log('metro initialize started, generating stories...');
				execSync('node ./scripts/route.js');
			}
		}
	}
};
