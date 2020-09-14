import axios from 'axios';
import { API_URL } from './utils';
import { Paste } from '../utils/PasteType';

export type GetPastesResponse = {
  numPastes: number;
  pastes: Array<Paste>;
};

export const getPastes = async (
  key: string,
  id: string,
  pageSize: number,
  currPage: number
) => {
  const res = await axios.get<GetPastesResponse>(
    `${API_URL}/potatoes/${id}/pastes?pageSize=${pageSize.toString()}&currPage=${currPage.toString()}`
  );
  return res.data;
};
