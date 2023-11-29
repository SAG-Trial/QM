import { getInput, setFailed, setOutput } from "@actions/core";

console.log(getInput('proceed'));

if ( getInput('proceed')=="true" ) {
    console.log(`Status is GO (${getInput('proceed')})`)
    setOutput('PROCEED_STATUS', 'GO');
} else {
    console.log(`Status is NOGO (${getInput('proceed')})`);
    setOutput('PROCEED_STATUS', 'NOGO');
    // setFailed(`Status is NO GO (${getInput('proceed')})`);

}