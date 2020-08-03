import Axios from "axios";
import Cookies from "js-cookie";

let urls = {
  test: `http://localhost:5000`,
  development: "http://localhost:5000/api",
  production: "https://www.demo.latitudnautica.com.ar/api"
};

const axiosBase = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"    
  }
});

export default axiosBase;
