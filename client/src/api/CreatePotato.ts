import axios from 'axios';
import { API_URL } from './utils';

export type CreatePotatoResponse = {
  message: string;
  id: string;
};

export const createPotato = async (nickname: string) => {
  const res = await axios.post<CreatePotatoResponse>(`${API_URL}/potatoes`, {
    nickname,
  });
  console.log(res);
  return res.data;
};
