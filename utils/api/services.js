import axiosBase from "@/utils/axiosBase";
import Cookies from "js-cookie";

export const _delete = async (id, endpoint) => {
  return await axiosBase
    .delete(`${endpoint}/${id}`, {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    })
};

export const _create = async (data, route) => {
  /*
  ** @router > is the type of resource to be created, "category" or "subcategory" 
  ** it must match with the api endpoints
  */
  return await axiosBase.post(`/category/${route}`, data, {
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  });
};
