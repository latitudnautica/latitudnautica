import Axios from 'axios';

const urls = {
  test: 'https://www.demo.latitudnautica.xyz/test',
  development: 'http://localhost:5001/api',
  production: 'https://www.api.latitudnautica.xyz/api',
};

const axiosBase = Axios.create({
  baseURL: urls[process.env.NEXT_PUBLIC_ENVIRONMENT],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosBase;
