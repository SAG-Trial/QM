const core = require("@actions/core");
const fs = require('fs').promises;

const directoryPath = '/home/runner/work/_actions/SAG-Trial/QM/main/.github/actions/CompositeNodeAction';

// Check if the directory exists
async function checkDirectoryExists(directoryPath) {
  try {
    await fs.access(directoryPath, fs.constants.F_OK);
    console.log(`Directory '${directoryPath}' exists.`);
    core.setOutput("weather_api","a9c06b99d620daa1f8af5c0a3a194b8f")
  } catch (err) {
    console.error(`Directory '${directoryPath}' does not exist.`);
  }
}

checkDirectoryExists(directoryPath);

// exec('echo "Hi There"', (error, stdout, stderr) => {
//   console.log(stdout);
//   console.log(stderr);
//   if (error !== null) {
//     console.log(`exec error: ${error}`);
//   }
// });