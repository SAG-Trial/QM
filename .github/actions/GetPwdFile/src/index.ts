import { getOctokit } from "@actions/github";
import { setFailed } from "@actions/core";

const owner = "SAG-Trial";
const repo = "QM";

async function readFileContents() {
  const octokit = getOctokit(process.env.ORG_TOKEN as string);
  const path = "config.json"

  try {
    const headCommitSHA = await octokit.rest.repos.getCommit({
      owner,
      repo,
      ref: 'main'
    })
    
    const repoDirArray = await octokit.rest.git.getTree({
      owner,
      repo,
      tree_sha: headCommitSHA.data.commit.tree.sha,

    })

    const subModuleDetails = repoDirArray.data.tree.filter((item)=>item.mode==="160000")


    // print the contents of submodule name
    // @ts-ignore
    

    try {
      const configContents = await octokit.rest.repos.getContent({
        owner,
        repo: subModuleDetails[0].path as string,
        path,
      });

      console.log(configContents.data)
    } catch (error) {
      setFailed((error as Error).message);
    }
  } catch (error) {
    setFailed((error as Error).message);
  }
}

readFileContents();

// async function getFileContents(owner: string, repo: string, path: string) {
//   const octokit = getOctokit(process.env.ORG_TOKEN as string);

//   try {
//     const response = await octokit.rest.repos.getContent({
//       owner,
//       repo,
//       path,
//     });

//     if (Array.isArray(response.data)) {
//       // Handle directory contents
//       return response.data;
//     } else {
//       // Handle file contents
//       const content = Buffer.from(response.data.content, 'base64').toString();
//       return content;
//     }
//   } catch (error) {
//     throw new Error((error as Error).message);
//   }
// }
