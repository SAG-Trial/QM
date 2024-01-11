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
const AUDIENCE = "https://github.com/SAG-Trial";

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
          console.log("JWT Token is valid and TRUE");
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
