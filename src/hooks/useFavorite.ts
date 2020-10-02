// Core
import { useCallback, useMemo, MouseEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Instruments
import { AppState } from '../store/rootReducer';
import { FavoriteState } from '../store/reducers/favoriteReducer';

// Actions
import {
  fillFavorites,
  addFavorite,
  removeFavorite,
} from '../store/actions/favoriteActions';

// Services
import { api } from '../services/api';
import { FavoriteProduct } from '../store/types/favorite';
import { Modals } from '../store/types/modal';
import { useModalManage } from '../dialogs/hooks';
import { checkIsFavorite } from '../utils/checkIsFavorite';
import { PublishedProduct } from '../store/types/catalog';
import { useSecurity } from './useSecurity';
import { toastService } from '../services/toast';
import { RequestState, useRequestState } from './useRequestState';

type UseFavorite = {
  isFav: boolean;
  filled: boolean;
  getFavoriteProducts(): void;
  addFavoriteProduct(favorite: FavoriteProduct): void;
  removeFavoriteProduct(id: number): void;
  handleFavouriteChange(e: MouseEvent): Promise<void>;
} & FavoriteState &
  RequestState;

export const useFavorite = (product?: PublishedProduct | null): UseFavorite => {
  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();
  const { apikey, userId } = useSecurity();
  const { open } = useModalManage();

  const dispatch = useDispatch();
  const { favorites } = useSelector(
    (state: AppState): FavoriteState => state.favorite,
  );

  const isFav = useMemo(() => checkIsFavorite(favorites, product?.id), [
    product,
    favorites,
  ]);

  const [filled, setFilled] = useState(isFav);

  useEffect(() => {
    setFilled(isFav);
  }, [isFav]);

  const getFavoriteProducts = useCallback(async () => {
    startRequest();
    try {
      // eslint-disable-next-line no-shadow
      const favorites = await api.favorite.getFavorites();
      dispatch(fillFavorites(favorites));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const addFavoriteProduct = useCallback(async (favorite: FavoriteProduct) => {
    startRequest();
    try {
      const newFavorite = await api.favorite.addFavorite(favorite);
      dispatch(addFavorite(newFavorite));
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, []);

  const removeFavoriteProduct = useCallback(async (id: number) => {
    startRequest();
    try {
      await api.favorite.removeFavorite(id.toString());
      dispatch(removeFavorite(id));
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, []);

  const openDeleteModal = useCallback((id: number): void => {
    open<() => void>(Modals.Delete, () => {
      setFilled(false);
      toastService.success('Товар удален из избранного');
      return removeFavoriteProduct(id);
    });
  }, []);

  const handleFavouriteChange = useCallback(
    async (e: MouseEvent): Promise<void> => {
      e.stopPropagation();
      e.preventDefault();

      if (!product) {
        return undefined;
      }

      if (loading) {
        return undefined;
      }

      if (apikey !== null && userId !== null) {
        if (isFav) {
          const favProductId = favorites.find(
            (fav) => fav.productId === product.id,
          )?.id;
          if (favProductId !== undefined) {
            openDeleteModal(favProductId);
          }
        } else {
          try {
            setFilled(true);
            addFavoriteProduct({ productId: product.id });
            toastService.success('Товар добавлен в избранное');
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        open(Modals.Login);
      }
      return undefined;
    },
    [isFav, apikey, userId, product, favorites, loading, open],
  );

  return {
    favorites,
    loading,
    getFavoriteProducts,
    addFavoriteProduct,
    removeFavoriteProduct,
    handleFavouriteChange,
    isFav,
    filled,
  };
};
