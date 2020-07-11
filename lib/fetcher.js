import Axios from "axios";

let urls = {
  test: `http://localhost:3000`,
  development: "http://localhost:3000/",
  production: "https://www.demo.latitudnautica.com.ar/"
};
const fetcher = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default fetcher;
