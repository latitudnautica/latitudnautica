import axios from "axios";

const fetcher = (url) =>
  axios(url)
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));

export default fetcher;
