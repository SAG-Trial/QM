// import axios library for making API calls to iTrac
import axios from "axios";

// Filter Number for cloud-open-blocker iTrac
const filter = "233129";

//URL Endpoint for iTrac
const iTracEndpoint = `https://itrac.eur.ad.sag/rest/api/2/search?jql=filter=${filter}`;

type Assignee = {
  self: string;
  name: string;
  key: string;
  emailAddress: string;
  displayName: string;
  active: boolean;
  timeZone: string;
};

type issue = {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    assignee: Assignee;
  };
};

type responseData = {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Array<issue>;
};

const config = {
  method: "GET",
  maxBodyLength: Infinity,
  url: iTracEndpoint,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.ITRAC_TOKEN}`,
  },
};

async function getAssignees() {
  const response = await axios.request<responseData>(config);

  const assignees = response.data.issues.map((issue) => {
    return {
      name: issue.fields.assignee.displayName,
      email: issue.fields.assignee.emailAddress,
    };
  });
}

getAssignees();
