import axiosBase from '@/utils/axiosBase';
import Cookies from 'js-cookie';

export const _delete = async (id, endpoint) => await axiosBase.delete(`${endpoint}/${id}`, {
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const _create = async (data, endpoint) =>
  /*
   ** @router > is the type of resource to be created, "category" or "subcategory"
   ** it must match with the api endpoints
   */
  await axiosBase.post(`/category/${endpoint}`, data, {
    headers: { Authorization: `Bearer ${Cookies.get('token')}` },
  });
export const _update = async (id, payload, endpoint) => await axiosBase.put(
  `${endpoint}/${id}`,
  { name: payload },
  { headers: { Authorization: `Bearer ${Cookies.get('token')}` } },
);
