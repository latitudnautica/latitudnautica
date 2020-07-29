import { useSWR } from "swr";
import axios from "axios";

const getCategories = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/category/all`;

  return axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(error));
};

export default getCategories;
