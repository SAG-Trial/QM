import { getInput, setFailed, setOutput } from "@actions/core";
import * as github from "@actions/github";
import { getOctokit } from "@actions/github";

// async function createPullRequest() {
//   const octokit=github.getOctokit(process.env.TOKEN_PAT as string)
//   try {

//     const owner = github.context.repo.owner;
//     const repo = github.context.repo.repo;

//     const baseBranch = getInput('base-branch') || github.context.ref;
//     const headBranch = getInput('main-branch') || 'main';
//     const title = getInput('pull-request-title');
//     const body = getInput('pull-request-body');

//     const pullRequest = await octokit.rest.pulls.create({
//       owner,
//       repo,
//       title,
//       body,
//       base: baseBranch,
//       head: headBranch,
//     });

//     setOutput('pull-request-url', pullRequest.data.html_url);
//   } catch (error) {
//     setFailed((error as Error).message);
//   }
// }

// createPullRequest();

async function createIssueAndComment() {
  const octokit = github.getOctokit(process.env.TOKEN_PAT as string);
  try {
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    const title = `Cycle Status ${github.context.runNumber} - ${github.context.runId}: [NOGO] - Review Needed `;
    const body = `${github.context.job} failed in the ${github.context.workflow} workflow. The status is NOGO`;

    // Create the issue
    const issue = await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
      assignees: ["@SAG-Trial/teams-1"],
    });

    const commentBody =
      "@SAG-Trial/teams-1 Please review and approve the cycle run";

    const comment = getInput("comment-body");

    // Add a comment to the issue
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: issue.data.number,
      body: commentBody,
    });
    
  } catch (error) {
    setFailed((error as Error).message);
  }
}

async function createDiscussion() {
  const octokit = getOctokit(process.env.TOKEN_PAT as string);
  try {
    
    const repo = github.context.repo.repo;
    const title = `Cycle Status ${github.context.runNumber} - ${github.context.runId}: [NOGO] - Review Needed `;
    const commentBody =
      `${github.context.job} failed in the ${github.context.workflow} workflow. The status is NOGO.\nRepository: ${repo}\n@SAG-Trial/teams-1 Please review and approve the cycle run`;

    // const response = await octokit.rest.teams.createDiscussionInOrg({
    //   org:"SAG-Trial",
    //   body: commentBody,
    //   team_slug: "teams-1",
    //   title: title,
    // });

    const response = await octokit.request('POST /orgs/{org}/teams/{team_slug}/discussions',{
      org:"SAG-Trial",
      body: commentBody,
      team_slug: "teams-1",
      title: title,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })

    console.log(`Discussion created with ID: ${response.data.number}`);
  } catch (error) {
    console.error("Error creating discussion:", error);
  }
}

// createIssueAndComment();
createDiscussion();
setFailed("Cycle Status is NOGO. Cannot proceed with the cycle run")
// If you enable email or web notifications for GitHub Actions, you'll receive a notification when any workflow runs that you've triggered have completed. The notification will include the workflow run's status (including successful, failed, neutral, and canceled runs). You can also choose to receive a notification only when a workflow run has failed. For more information about enabling or disabling notifications, see "About notifications."
// Notifications for scheduled workflows are sent to the user who initially created the workflow. If a different user updates the cron syntax in the workflow file, subsequent notifications will be sent to that user instead. If a scheduled workflow is disabled and then re-enabled, notifications will be sent to the user who re-enabled the workflow rather than the user who last modified the cron syntax.
// You can also see the status of workflow runs on a repository's Actions tab. For more information, see "Managing workflow runs."