const semver = require('semver');
const { engines, name, version } = require('./package');

const currentVersion = process.version;
const requiredVersion = engines.node;

if (!semver.satisfies(currentVersion, requiredVersion)) {
  console.log({
    'Unsupported engine': {
      package: `${name}@${version}`,
      required: {
        node: requiredVersion
      },
      current: {
        node: currentVersion
      },
      suggestion: 'Run `nvm use` to switch to required node version.'
    }
  });
  process.exit(1);
} else {
  console.log({
    'Engines supported': {
      package: `${name}@${version}`,
      required: {
        node: requiredVersion
      },
      current: {
        node: currentVersion
      }
    }
  });
}
