import axios from 'axios';
import { API_URL } from './utils';

export type GetPotatoResponse = {
  nickname?: string;
  createdAt: number;
};

export const getPotato = async (key: string, id: string) => {
  const res = await axios.get<GetPotatoResponse>(`${API_URL}/potatoes/${id}`);
  return res.data;
};
