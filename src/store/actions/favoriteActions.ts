import {
  FavoriteActionTypes,
  FavoriteProduct,
  FILL_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from '../types/favorite';

export const fillFavorites = (
  favorites: FavoriteProduct[],
): FavoriteActionTypes => ({
  type: FILL_FAVORITES,
  favorites,
});

export const addFavorite = (
  favorite: FavoriteProduct,
): FavoriteActionTypes => ({
  type: ADD_FAVORITE,
  favorite,
});

export const removeFavorite = (id: number): FavoriteActionTypes => ({
  type: REMOVE_FAVORITE,
  id,
});
