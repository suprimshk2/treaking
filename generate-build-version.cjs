const fs = require('fs');
const packageJson = require('./package.json');

const appVersion = JSON.stringify({
  version: packageJson.version,
});

fs.writeFile('./public/version.json', appVersion, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing App version to version.json');
    return console.log(err);
  }

  console.log('version.json file has been saved with latest version number');
});
