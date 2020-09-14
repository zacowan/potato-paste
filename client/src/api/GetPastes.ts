import axios from 'axios';
import { API_URL } from './utils';
import { Paste } from '../utils/PasteType';

export type GetPastesResponse = Array<Paste>;

export const getPastes = async (key: string, id: string) => {
  const res = await axios.get<GetPastesResponse>(
    `${API_URL}/potatoes/${id}/pastes`
  );
  return res.data;
};
