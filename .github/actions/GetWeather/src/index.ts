import * as jwt from "jsonwebtoken"
import axios from "axios"


const encryptionUnlockKey = "39a077bd7f5cdd38ea02a4ab182e45ca9fe4edc61102b4968)0758a76043c680e49df9e5accbc6e2681d96fbeb308bfaa3a80758a76043c680e49df9e5accbc6e2681d96fbeb308bfaa3a8864e3600b9864e3600b95979827aee96814c612"

const encryptedToken = "eyJhbGciOiJIUzI1NiJ9.YTljMDZiOTlkNjIwZGFhMWY4YWY1YzBhM2ExOTRiOGY.fQtDqFscUomdlhtN2ogbHhS9AAnD6d5n-lVFRORWatc"

const decryptedToken = jwt.verify(encryptedToken, encryptionUnlockKey)


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `http://api.weatherstack.com/current?access_key=${decryptedToken}&query="New York"`,
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});