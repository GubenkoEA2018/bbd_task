// Core
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Instruments
import { AppState } from '../store/rootReducer';
import { OrderState } from '../store/reducers/orderReducer';

// Actions
import {
  fillOrders,
  fillCreatedOrder,
  fillCurrentOrder,
  fillDate,
  fillIntervals,
} from '../store/actions/orderActions';

// Services
import { api } from '../services/api';
import { RequestState, useRequestState } from './useRequestState';
import {
  OrderData,
  OrderSchema,
  PaymentPosition,
  TrackingBody,
} from '../store/types/order';
import { toastService } from '../services/toast';

// Hooks
import { useBasket } from './useBasket';
import { useUser } from './useUser';
import {
  OnlinePaymentStatus,
  useOnlinePaymentStatus,
} from './useOnlinePaymentStatus';

type UseOrder = {
  getOrders(): Promise<void>;
  getOrder(id: string): Promise<void>;
  makeOrder(): Promise<void>;
  postOrder(orderData: OrderData): Promise<void>;
  getDate(): Promise<void>;
  getTime(): Promise<void>;
  getTrack(trackInfo: TrackingBody): Promise<void>;
  retryOrder(orderId: string): Promise<void>;
  onlineSuccessOrder(orderId: string): Promise<void>;
  onlineFailOrder(orderId: string): Promise<void>;
} & OrderState &
  RequestState &
  OnlinePaymentStatus;

export const useOrder = (): UseOrder => {
  const {
    successOnlinePayment,
    failureOnlinePayment,
    failMessage,
    setSuccessOnlinePayment,
    setFailureOnlinePayment,
    setFailMessage,
  } = useOnlinePaymentStatus();

  const { getBasket } = useBasket();
  const { getUserData } = useUser();
  const history = useHistory();
  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();

  const dispatch = useDispatch();
  const { orders, createdOrder, currentOrder, date, intervals } = useSelector(
    (state: AppState): OrderState => state.order,
  );

  const getOrders = useCallback(async () => {
    startRequest();
    try {
      const orderList = await api.order.getOrders();
      dispatch(fillOrders(orderList));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, [dispatch]);

  const getOrder = useCallback(
    async (id: string) => {
      startRequest();
      try {
        const order = await api.order.getOrder(id);
        dispatch(fillCurrentOrder(order));
      } catch (e) {
        setErrorMessage(e);
      } finally {
        stopRequest();
      }
    },
    [dispatch],
  );

  const makeOrder = useCallback(async () => {
    startRequest();
    try {
      const order = await api.order.makeOrder();
      dispatch(fillCreatedOrder(order));
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, [dispatch]);

  const postOrder = useCallback(async (orderData: OrderData) => {
    startRequest();
    try {
      const response = await api.order.postOrder(orderData);
      // if cash or balance payment
      if (response.status === 200) {
        const { id } = response.data as OrderSchema;
        history.push(`/order/${id}`);
        toastService.success('Заказ оформлен');
        getBasket();
        getUserData();
      }
      // if cashless payment
      if (response.status === 202) {
        const { paymentFormUrl } = response.data as PaymentPosition;
        window.location.href = paymentFormUrl;
      }
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const getDate = useCallback(async () => {
    startRequest();
    try {
      const dateList = await api.order.getDate();
      dispatch(fillDate(dateList));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, [dispatch]);

  const getTime = useCallback(async () => {
    startRequest();
    try {
      const intervalList = await api.order.getTime();
      dispatch(fillIntervals(intervalList));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, [dispatch]);

  const getTrack = useCallback(async (trackInfo: TrackingBody) => {
    startRequest();
    try {
      const trackOrder = await api.order.getTrack(trackInfo);
      console.log('trackOrder', trackOrder);
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const retryOrder = useCallback(async (orderId: string) => {
    startRequest();
    try {
      const response = await api.order.retryOrder(orderId);
      if (response.status === 200) {
        await getBasket();
        toastService.success('Товары добавлены в корзину');
      }
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const onlineSuccessOrder = useCallback(async (orderId: string) => {
    startRequest();
    setSuccessOnlinePayment(false);
    setFailureOnlinePayment(false);
    try {
      const response = await api.order.onlineSuccessOrder(orderId);
      if (response.status === 200) {
        setSuccessOnlinePayment(true);
      } else {
        throw new Error('Неверный формат ответа сервера');
      }
    } catch (e) {
      setErrorMessage(e);
      setFailureOnlinePayment(true);
    } finally {
      stopRequest();
    }
  }, []);

  const onlineFailOrder = useCallback(async (orderId: string) => {
    startRequest();
    setSuccessOnlinePayment(false);
    setFailureOnlinePayment(false);
    try {
      const errorObject = await api.order.onlineFailOrder(orderId);
      if ('errorDescription' in errorObject && errorObject.errorDescription) {
        setSuccessOnlinePayment(true);
        setFailMessage(errorObject.errorDescription);
      } else {
        throw new Error('Неверный формат ответа сервера');
      }
    } catch (e) {
      setErrorMessage(e);
      setFailureOnlinePayment(true);
    } finally {
      stopRequest();
    }
  }, []);

  return {
    loading,
    orders,
    createdOrder,
    currentOrder,
    date,
    intervals,
    getOrders,
    getOrder,
    makeOrder,
    postOrder,
    getDate,
    getTime,
    getTrack,
    retryOrder,
    successOnlinePayment,
    failureOnlinePayment,
    onlineSuccessOrder,
    onlineFailOrder,
    failMessage,
  };
};
