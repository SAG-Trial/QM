import * as jwt from "jsonwebtoken"
import axios from "axios"
import crypto from "crypto"



const encryptionUnlockKey = crypto.randomBytes(32);
// const encryptionUnlockKeyToString = crypto.randomBytes(32);
// const encryptionUnlockKey = crypto.randomBytes(32);
console.log("🚀 ~ file: index.ts:8 ~ encryptionUnlockKey:", encryptionUnlockKey.toString())
const iv = crypto.randomBytes(16);
// const iv = crypto.randomBytes(16);
console.log("🚀 ~ file: index.ts:10 ~ iv:", iv.toString())

// const encryptedToken = "eyJhbGciOiJIUzI1NiJ9.YTljMDZiOTlkNjIwZGFhMWY4YWY1YzBhM2ExOTRiOGY.fQtDqFscUomdlhtN2ogbHhS9AAnD6d5n-lVFRORWatc"

const apiKeyToEncrypt = "a9c06b99d620daa1f8af5c0a3a194b8f" 
function encryptApiKey(apiKey: string, encryptionUnlockKey: Buffer): string {
  // Generate a random initialization vector (IV)

  // Create a cipher using AES-256-CBC algorithm
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionUnlockKey, iv);

  // Encrypt the API key
  let encryptedApiKey = cipher.update(apiKey, 'utf-8', 'hex');
  encryptedApiKey += cipher.final('hex');

  return encryptedApiKey;
}

// const encryptedApiKey = "80f1ffe15711f2d3d05b3934307fba2db83a157f3832d67bd4bf382c0418888ff495931c9c3a8a3fa647b7c4589a1723"
const encryptedApiKey = encryptApiKey(apiKeyToEncrypt, encryptionUnlockKey);
console.log("🚀 ~ file: index.ts:28 ~ encryptedApiKey:", encryptedApiKey)


function decryptApiKey(encryptedApiKey: string, encryptionUnlockKey: Buffer): string {
  // Get the initialization vector (IV) from the encrypted API key

  // Create a decipher using AES-256-CBC algorithm
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionUnlockKey, iv);

  // Decrypt the API key
  let decryptedApiKey = decipher.update(encryptedApiKey, 'hex', 'utf-8');
  decryptedApiKey += decipher.final('utf-8');

  return decryptedApiKey;
}

const decryptedApiKey = decryptApiKey(encryptedApiKey, encryptionUnlockKey);
console.log("🚀 ~ file: index.ts:45 ~ decryptedApiKey:", decryptedApiKey)


// let config = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: `http://api.weatherstack.com/current?access_key=${decryptedToken}&query="New York"`,
//   headers: { }
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });


