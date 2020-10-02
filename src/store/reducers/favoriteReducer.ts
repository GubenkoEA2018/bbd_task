import {
  FavoriteProduct,
  FavoriteActionTypes,
  FILL_FAVORITES,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from '../types/favorite';

export type FavoriteState = {
  favorites: FavoriteProduct[];
};

const initialState: FavoriteState = {
  favorites: [],
};

export const favoriteReducer = (
  state = initialState,
  action: FavoriteActionTypes,
): FavoriteState => {
  switch (action.type) {
    case FILL_FAVORITES:
      return {
        ...state,
        favorites: action.favorites,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.favorite],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((f) => f.id !== action.id),
      };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
