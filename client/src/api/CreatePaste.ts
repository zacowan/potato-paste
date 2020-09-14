import axios from 'axios';
import { API_URL } from './utils';

export type CreatePasteResponse = {
  message: string;
  id: string;
};

export type CreatePasteParams = {
  potatoId: string;
  value: string;
};

export const createPaste = async ({ potatoId, value }: CreatePasteParams) => {
  const res = await axios.post<CreatePasteResponse>(
    `${API_URL}/potatoes/${potatoId}/pastes`,
    {
      value,
    }
  );
  return res.data;
};
