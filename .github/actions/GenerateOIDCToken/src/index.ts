import { setOutput,getIDToken,setSecret } from "@actions/core";
import base64url from "base64url";

const AUD = "https://github.com/SAG-Trial"


const generateToken = async (aud: string) => {
    const token =await getIDToken(AUD);
    console.log(base64url.encode(token, "utf8"));
    // setSecret(base64url.encode(token, "utf8"));
    setOutput("signedJWTencoded",setSecret(base64url.encode(token, "utf8")));
}

generateToken(AUD);