import { setOutput,getIDToken,setSecret } from "@actions/core";
import base64url from "base64url";

const AUD = "https://github.com/SAG-Trial"
const token = process.env['ACTIONS_RUNTIME_TOKEN']
const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL']

console.log("toke:",token);
console.log("runtimeUrl:",runtimeUrl);

const generateToken = async (aud: string) => {
    const token =await getIDToken(AUD);
    console.log(token);
    // setSecret(base64url.encode(token, "utf8"));
    // setOutput("signedJWTencoded",setSecret(base64url.encode(token, "utf8")));
    setOutput("OIDC_BASE64",token);
}

generateToken(AUD);