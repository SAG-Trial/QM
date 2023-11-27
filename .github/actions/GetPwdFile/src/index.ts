import {getOctokit} from "@actions/github";
import { setFailed } from "@actions/core";

const owner = "SAG-Trial";
const repo = "b";

async function readFileContents() {
  const octokit = getOctokit(process.env.ORG_TOKEN as string);

  try {
    const pwd =await octokit.rest.repos.getContent({
      owner,
      repo,
      path: "pwd.txt",
      ref: "secret_branch"
    });
  
    // console.log(Buffer.from(pwd.headers. , 'base64').toString());
    
    const result = pwd.data
    
    // print the contents of pwd
    // @ts-ignore
    console.log(atob(result.content));
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
