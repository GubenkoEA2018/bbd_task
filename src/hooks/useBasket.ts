// Core
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Instruments
import { AppState } from '../store/rootReducer';
import { BasketState } from '../store/reducers/basketReducer';

// Actions
import { fillBasket } from '../store/actions/basketActions';

// Services
import { api } from '../services/api';
import { Modals } from '../store/types/modal';
import { useModalManage } from '../dialogs/hooks';
import { RequestState, useRequestState } from './useRequestState';
import { BasketPositionCreate } from '../store/types/basket';
import { PublishedProduct } from '../store/types/catalog';
import { useSecurity } from './useSecurity';

type UseBasket = {
  getBasket(): void;
  addOne(
    position: BasketPositionCreate,
    leftInStock: number,
    product: PublishedProduct,
  ): Promise<void>;
  removeOne(position: BasketPositionCreate, positionId: number): Promise<void>;
  removeFromBasket(id: number): Promise<void>;
  addToBasket(position: BasketPositionCreate): Promise<void>;
  openDeleteModal(id: number): void;
} & BasketState &
  RequestState;

export const useBasket = (): UseBasket => {
  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();
  const { open } = useModalManage();
  const { apikey, userId } = useSecurity();

  const dispatch = useDispatch();
  const { basket } = useSelector(
    (state: AppState): BasketState => state.basket,
  );

  const getBasket = useCallback(async () => {
    startRequest();
    try {
      // eslint-disable-next-line no-shadow
      const basket = await api.basket.getBasket();
      dispatch(fillBasket(basket));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, [dispatch]);

  const addToBasket = useCallback(
    async (position: BasketPositionCreate) => {
      startRequest();
      try {
        // eslint-disable-next-line no-shadow
        const basket = await api.basket.addToBasket(position);
        dispatch(fillBasket(basket));
      } catch (e) {
        setErrorMessage(e);
      } finally {
        stopRequest();
      }
    },
    [dispatch],
  );

  const removeFromBasket = useCallback(
    async (id: number) => {
      startRequest();
      try {
        // eslint-disable-next-line no-shadow
        const basket = await api.basket.removeFromBasket(id.toString());
        dispatch(fillBasket(basket));
      } catch (e) {
        setErrorMessage(e);
      } finally {
        stopRequest();
      }
    },
    [dispatch],
  );

  const openDeleteModal = useCallback(
    (id: number): void => {
      open<() => void>(Modals.Delete, () => {
        return removeFromBasket(id);
      });
    },
    [open],
  );

  const openAddProductModal = useCallback(
    (product: PublishedProduct): void => {
      open<PublishedProduct>(Modals.Cart, product);
    },
    [open],
  );

  const addOne = useCallback(
    async (
      position: BasketPositionCreate,
      remainsOnStock: number,
      product: PublishedProduct,
    ): Promise<void> => {
      if (apikey !== null && userId !== null) {
        const { amount, priceId } = position;
        if (amount === remainsOnStock) {
          return undefined;
        }
        await addToBasket({
          amount: amount + 1,
          priceId,
        });
        if (amount === 0) {
          return openAddProductModal(product);
        }
        return undefined;
      }

      return open(Modals.Login);
    },
    [apikey, userId],
  );

  const removeOne = useCallback(
    async (
      position: BasketPositionCreate,
      positionId: number,
    ): Promise<void> => {
      if (apikey !== null && userId !== null) {
        const { amount, priceId } = position;
        if (amount === 1) {
          openDeleteModal(positionId);
          return undefined;
        }
        return addToBasket({
          amount: amount - 1,
          priceId,
        });
      }
      return open(Modals.Login);
    },
    [apikey, userId],
  );

  return {
    loading,
    basket,
    getBasket,
    addOne,
    removeOne,
    removeFromBasket,
    addToBasket,
    openDeleteModal,
  };
};
