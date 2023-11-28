import { getOctokit } from "@actions/github";
import { setFailed } from "@actions/core";

const owner = "SAG-Trial";
const repo = "b";

async function readFileContents() {
  const octokit = getOctokit(process.env.ORG_TOKEN as string);

  try {
    const subModuleDir = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: ".gitmodules",
    });

    // console.log(Buffer.from(pwd.headers. , 'base64').toString());

    const result = subModuleDir.data;

    // print the contents of submodule name
    // @ts-ignore
    const subModuleName = atob(result.content)
      .split("\n")[0]
      .split(" ")[1]
      .replace(/["\]]/g, "");

    try {
      const pwd = await octokit.rest.repos.getContent({
        owner,
        repo: subModuleName,
        path: "pwd.txt",
      });

      // @ts-ignore
      console.log(atob(pwd.data.content))
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
