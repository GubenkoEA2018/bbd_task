import { PublishedProduct } from './catalog';

export type FavoriteProduct = {
  id?: number;
  productId: number;
  product?: PublishedProduct;
};

export const FILL_FAVORITES = 'FILL_FAVORITES';
export type FillFavoritesAction = {
  type: typeof FILL_FAVORITES;
  favorites: FavoriteProduct[];
};

export const ADD_FAVORITE = 'ADD_FAVORITES';
export type AddFavoriteAction = {
  type: typeof ADD_FAVORITE;
  favorite: FavoriteProduct;
};

export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export type RemoveFavoriteAction = {
  type: typeof REMOVE_FAVORITE;
  id: number;
};

export type FavoriteActionTypes =
  | FillFavoritesAction
  | AddFavoriteAction
  | RemoveFavoriteAction;
