// eslint-disable-next-line import/no-unresolved
import axiosBase from '@/utils/axiosBase';
import Cookies from 'js-cookie';

export const apiDelete = async (id, endpoint) => axiosBase.delete(`${endpoint}/${id}`, {
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const apiCreate = async (data, endpoint) => axiosBase.post(`/category/${endpoint}`, data, {
  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
});

export const apiUpdate = async (id, payload, endpoint) => axiosBase.put(
  `${endpoint}/${id}`,
  { name: payload },
  { headers: { Authorization: `Bearer ${Cookies.get('token')}` } },
);
