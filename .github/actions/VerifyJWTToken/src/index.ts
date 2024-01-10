import { setFailed, getInput, setOutput } from "@actions/core";
import { JwtPayload, verify } from "jsonwebtoken";
import base64url from "base64url";
// import { readFileSync } from "fs";

/* INTERFACES */

interface parentJWTPayload extends JwtPayload {
  job_workflow_ref: string;
}

/* TYPES */
type signedJWTToken = {
  count: number;
  value: string;
};

const PARENT_ORGANIZATION = "SAG-Trial";
const PARENT_REPOSITORY = "QM";
const AUDIENCE = "https://github.softwareag.com/SAG-Trial";

// Public key converted from JWK format
const PUB_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu8zSYn5JR/O5yywSeOhm
WWd7OMoLblh4iGTeIhTOVon+5e54RK30YQDeUCjpb9u3vdHTO7XS7i6EzkwLbsUO
ir27uhqoFGGWXSAZrPocOobSFoLC5l0NvSKRqVtpoADOHcAh59vLbr8dz3xtEEGx
/qlLTzfFfWiCIYWiy15C2oo1eNPxzQfOvdu7Yet6Of4musV0Es5/mNETpeHOVEri
8PWfxzw485UHIj3socl4Lk/I3iDyHfgpT49tIJYhHE5NImLNdwMha1cBCIbJMy1d
JCfdoK827Hi9qKyBmftNQPhezGVRsOjsf2BfUGzGP5pCGrFBjEOcLhj/3j+TJebg
vQIDAQAB
-----END PUBLIC KEY-----`;

const signedJWTbase64encoded = getInput("signedJWTbase64encoded");
/* const signedJWTbase64encoded =
"eyJjb3VudCI6MTg2OSwidmFsdWUiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpTVXpJMU5p SXNJbmcxZENJNklraDVjVFJPUVZSQmFuTnVjVU0zYldSeWRFRm9hSEpEVWpKZlVTSXNJbXRwWkNJ NklqRkdNa0ZDT0RNME1EUkRNRGhGUXpsRlFUQkNRams1UkVGRlJEQXlNVGcyUWpBNU1VUkNSalFp ZlEuZXlKcWRHa2lPaUl4T1RVNVlXUTJPUzFoTlRSaExUUmpPV1F0WVdNd1lTMWhaR1UxTkRBelpE VXhaak1pTENKemRXSWlPaUp5WlhCdk9sTkJSeTFVY21saGJDOVJUVHB5WldZNmNtVm1jeTlvWldG a2N5OXRZV2x1SWl3aVlYVmtJam9pWjJoaExXMWxaR2wxYlNJc0luSmxaaUk2SW5KbFpuTXZhR1Zo WkhNdmJXRnBiaUlzSW5Ob1lTSTZJakkzTlRVMVpqazJOR0kzTnpRd056YzBNemN5TTJFME1HTTNP V0V3WWpVMVltWTFNbUprWW1JaUxDSnlaWEJ2YzJsMGIzSjVJam9pVTBGSExWUnlhV0ZzTDFGTklp d2ljbVZ3YjNOcGRHOXllVjl2ZDI1bGNpSTZJbE5CUnkxVWNtbGhiQ0lzSW5KbGNHOXphWFJ2Y25s ZmIzZHVaWEpmYVdRaU9pSXhORGd4T0RVMU16UWlMQ0p5ZFc1ZmFXUWlPaUkzTkRjeE9EVXpPVEUw SWl3aWNuVnVYMjUxYldKbGNpSTZJakUwSWl3aWNuVnVYMkYwZEdWdGNIUWlPaUl4SWl3aWNtVndi M05wZEc5eWVWOTJhWE5wWW1sc2FYUjVJam9pY0hWaWJHbGpJaXdpY21Wd2IzTnBkRzl5ZVY5cFpD STZJamN3Tmpjd01UTXdPU0lzSW1GamRHOXlYMmxrSWpvaU1UUXpOVGt3TXpreklpd2lZV04wYjNJ aU9pSndjbWh6WVdjaUxDSjNiM0pyWm14dmR5STZJa05oYkd3Z1EyOXVaR2wwYVc5dVlXd2dWbUYx YkhRZ2JHOW5hVzRpTENKb1pXRmtYM0psWmlJNklpSXNJbUpoYzJWZmNtVm1Jam9pSWl3aVpYWmxi blJmYm1GdFpTSTZJbmR2Y210bWJHOTNYMlJwYzNCaGRHTm9JaXdpY21WbVgzQnliM1JsWTNSbFpD STZJbVpoYkhObElpd2ljbVZtWDNSNWNHVWlPaUppY21GdVkyZ2lMQ0ozYjNKclpteHZkMTl5WldZ aU9pSlRRVWN0VkhKcFlXd3ZVVTB2TG1kcGRHaDFZaTkzYjNKclpteHZkM012WTJGc2JDMWpiMjVr YVhScGIyNWhiQzEyWVhWc2RDNTVZVzFzUUhKbFpuTXZhR1ZoWkhNdmJXRnBiaUlzSW5kdmNtdG1i RzkzWDNOb1lTSTZJakkzTlRVMVpqazJOR0kzTnpRd056YzBNemN5TTJFME1HTTNPV0V3WWpVMVlt WTFNbUprWW1JaUxDSnFiMkpmZDI5eWEyWnNiM2RmY21WbUlqb2lVMEZITFZSeWFXRnNMMUZOTHk1 bmFYUm9kV0l2ZDI5eWEyWnNiM2R6TDJOaGJHd3RZMjl1WkdsMGFXOXVZV3d0ZG1GMWJIUXVlV0Z0 YkVCeVpXWnpMMmhsWVdSekwyMWhhVzRpTENKcWIySmZkMjl5YTJac2IzZGZjMmhoSWpvaU1qYzFO VFZtT1RZMFlqYzNOREEzTnpRek56SXpZVFF3WXpjNVlUQmlOVFZpWmpVeVltUmlZaUlzSW5KMWJt NWxjbDlsYm5acGNtOXViV1Z1ZENJNkltZHBkR2gxWWkxb2IzTjBaV1FpTENKcGMzTWlPaUpvZEhS d2N6b3ZMM1J2YTJWdUxtRmpkR2x2Ym5NdVoybDBhSFZpZFhObGNtTnZiblJsYm5RdVkyOXRJaXdp Ym1KbUlqb3hOekEwT0RjeU5qZzJMQ0psZUhBaU9qRTNNRFE0TnpNMU9EWXNJbWxoZENJNk1UY3dO RGczTXpJNE5uMC5LV2N5cGRWaDZRaFFubkFxYlljNHNUS1JBb2JobjhGUmFIN1FVTmtpdWZqRDFS dVl3ZjRiUmJZeXpGX01KODlQakMzTzY0NjA1dDlSZ0xkRjhVaW9wZk5LbHRvdklnaWxwbHhDUTNM NERjTWgwY2lWVkFNdk5za0dqdmNvTl8wTWc1UEVmVnpscFZISXhUR19TQ2hVV2RUVndidXRvNUxC S0U5bzRMeDl3d0hmcFM3RXV1SzBqRXRKeUswZ0RfU2k3NHN2eXZhUV9hLU5ybHUycGFrV2FLZWpP NDZ5OTVQbVN5eWFRbFVkNEs1cVBaTjN6Vm9FUWhOT2Zqb1N0TEpZVVJ1TjNIZkVyd1RsckdlY1Qt Q3QyQTJBc2RBMFRNUS1JR1hYR08wZUpfT0R0NVpDdmQ0OVZhdWxPc19mVk1kVG9uRUtPMU4yM1Mx eFNsX0ZycGwwZVEifQ=="; */


const verifyJWTToken = async (tokenBase64encoded: string, pubKey: string) => {
  // Decode the base64 encoded token from the parent
  const signedJWTdecoded = base64url.decode(tokenBase64encoded);
  
//   console.log("🚀 ~ signedJWTdecoded:", signedJWTdecoded);

  // signedWebToken is decoded from base64 to an object
  const signedJWTToken: signedJWTToken = await JSON.parse(signedJWTdecoded);

  // Verify if the token from the parent is valid
  verify(
    signedJWTToken.value,
    pubKey,
    { algorithms: ["RS256"] },
    (err, payload) => {
      if (err) {

        /* 
             DEBUGGING IN CONSOLE
             // console.log("🚀 ~ err.message:", err.message);
             // console.log("🚀 ~ err.name:", err.name);
        */
        setFailed(err.message);
        setFailed(err.name);
      } else {
        const parentOrganisation = (
          payload as parentJWTPayload
        ).job_workflow_ref.split("/")[0];
        const parentRepository = (
          payload as parentJWTPayload
        ).job_workflow_ref.split("/")[1];
        const payloadAudience = (payload as parentJWTPayload).aud;    

        // console.log("🚀 ~ typeof(payload):", typeof(payload));
        console.log("🚀 ~ parentOrganisation:", parentOrganisation);
        console.log("🚀 ~ parentRepository:", parentRepository);
        console.log("🚀 ~ payloadAudience:", payloadAudience);

        // Check whether the user of vault login workflow is from QM repository
        if (
          parentOrganisation === PARENT_ORGANIZATION &&
          parentRepository === PARENT_REPOSITORY &&
          payloadAudience === AUDIENCE
        ) {
          setOutput("JWTTokenVerified", "true");
        } else {
          setFailed("JWT Token is not valid");
          setOutput("JWTTokenVerified", "false");
        }
      }
    }
  );
};

verifyJWTToken(signedJWTbase64encoded, PUB_KEY);
