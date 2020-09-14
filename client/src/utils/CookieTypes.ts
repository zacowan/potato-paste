import { Cookies } from 'react-cookie';

// Constants
export const POTATO_ID = 'potatoId';
export const POTATO_HISTORY = 'potatoHistory';
// 90 days in seconds
export const COOKIE_AGE = 60 * 60 * 24 * 90;
export const HISTORY_SIZE = 5;

// Types
export type VisitedPotato = {
  visitedOn: number;
  id: string;
  link: string;
  nickname: string;
};

export type PotatoHistory = Array<VisitedPotato>;
