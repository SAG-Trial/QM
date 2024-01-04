import axios from "axios"


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `http://api.weatherstack.com/current?access_key=${process.env.PASSWORD}&query="New York"`,
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


