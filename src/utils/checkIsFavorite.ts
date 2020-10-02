import { FavoriteProduct } from '../store/types/favorite';

export const checkIsFavorite = (
  favorites: FavoriteProduct[],
  checkingProductId?: number,
): boolean => {
  if (!checkingProductId) {
    return false;
  }
  const favIdList = favorites.map((f) => f.productId);

  return favIdList.includes(checkingProductId);
};
