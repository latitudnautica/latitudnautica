import Axios from "axios";

let urls = {
  test: `https://www.demo.latitudnautica.xyz/test`,
  development: "https://www.api.latitudnautica.xyz/api",
  production: "https://www.api.latitudnautica.xyz/api"
};

const axiosBase = Axios.create({
  baseURL: urls[process.env.environment],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"    
  }
});

export default axiosBase;
