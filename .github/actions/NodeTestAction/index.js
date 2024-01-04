const core = require("@actions/core");
const github = require("@actions/github");
const { exec } = require("child_process");

core.setOutput("myOutput", "Hello World!");
core.setOutput("workflow", github.context.workflow);
core.setOutput("githubContext", github);

exec('echo "Hi There"', (error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
});
