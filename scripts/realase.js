const args = require('minimist')(process.argv.slice(2));
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const semver = require('semver');
const currentVersion = require('../package.json').version;
const { prompt } = require('enquirer');
const execa = require('execa');

const preId =
	args.preid ||
	(semver.prerelease(currentVersion)?.[0] &&
		!semver.prerelease(currentVersion)?.[0].includes('experimental'));

const { publish = true, publishExpo } = args;

const versionIncrements = [
	'patch',
	'minor',
	'major',
	...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : [])
];

const inc = (i) => semver.inc(currentVersion, i, preId);
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts });
const step = (msg) => console.log(chalk.cyan(msg));

async function main() {
	let targetVersion = args._[0];

	let isExperimental = false;

	if (!targetVersion) {
		const { release } = await prompt({
			type: 'select',
			name: 'release',
			message: 'Select release type',
			choices: versionIncrements.map((i) => `${i} (${inc(i)})`).concat(['experimental', 'custom'])
		});

		if (release === 'custom') {
			targetVersion = (
				await prompt({
					type: 'input',
					name: 'version',
					message: 'Input custom version',
					initial: currentVersion
				})
			).version;
		} else if (release === 'experimental') {
			const { stdout: commitHash } = await run('git', ['rev-parse', '--short', 'HEAD'], {
				stdio: undefined
			});
			targetVersion = `0.0.0-experimental.${+new Date()}-${commitHash.toString().trim()}`;
			isExperimental = true;
		} else {
			targetVersion = release.match(/\((.*)\)/)[1];
		}
	}

	if (!semver.valid(targetVersion)) {
		throw new Error(`invalid target version: ${targetVersion}`);
	}

	const { yes } = await prompt({
		type: 'confirm',
		name: 'yes',
		message: `Releasing v${targetVersion}. Confirm?`
	});

	if (!yes) {
		return;
	}

	// update package version
	updateVersion(targetVersion);

	// git commit
	await run('npm', ['run', 'precommit']);
	await run('git', ['add', '-A']);
	// skip .npmrc
	await run('git', ['reset', '--', '.npmrc']);
	await run('git', [
		'commit',
		'--no-verify',
		'-m',
		isExperimental ? 'release experimental version' : `release: v${targetVersion}`
	]);

	// building package
	step('\nBuilding...');
	await run('npm', ['run', 'build']);

	if (publish) {
		// publish to npm
		step('\nPublishing...');
		await run('npm', ['publish']);

		// push to GitHub
		step('\nPushing to GitHub...');
		if (!isExperimental) {
			await run('git', ['tag', targetVersion]);
			await run('git', ['push', 'origin', `refs/tags/${targetVersion}`]);
		}
		await run('git', ['push']);
	}

	// publish to expo
	if (publishExpo) {
		step('\nPushing to expo...');
		await run('npm', ['run', 'expo:publish']);
	}
}

function updateVersion(version) {
	const pkgPath = path.resolve(__dirname, '..', 'package.json');
	const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
	const prevVersion = pkg.version;
	pkg.version = version;
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 4) + '\n');
	return prevVersion;
}

main().catch((err) => {
	console.error(err);
});
