// Constants
export const POTATO_FAVORITE = 'potatoFavorite';
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

export type FavoritePotato = VisitedPotato;

export type PotatoHistory = Array<VisitedPotato>;
