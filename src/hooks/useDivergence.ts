// Core
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Services
import { api } from '../services/api';
import { RequestState, useRequestState } from './useRequestState';
import { AppState } from '../store/rootReducer';
import { DivergenceState } from '../store/reducers/divergenceReducer';
import { fillDivergence } from '../store/actions/divergenceActions';
import { PaymentPosition } from '../store/types/order';
import { toastService } from '../services/toast';
import { DivergenceData } from '../store/types/divergence';
// Hooks
import {
  OnlinePaymentStatus,
  useOnlinePaymentStatus,
} from './useOnlinePaymentStatus';
import { useUser } from './useUser';
import { useModalManage } from '../dialogs/hooks';
import { Modals } from '../store/types/modal';

type UseDivergence = {
  makeDivergence(): Promise<void>;
  postDivergence(divergenceData: DivergenceData): Promise<void>;
  successDivergence(orderId: string): Promise<void>;
  failDivergence(orderId: string): Promise<void>;
  resetDivergence(): void;
} & RequestState &
  OnlinePaymentStatus &
  DivergenceState;

export const useDivergence = (): UseDivergence => {
  const { open } = useModalManage();

  const {
    successOnlinePayment,
    failureOnlinePayment,
    failMessage,
    setSuccessOnlinePayment,
    setFailureOnlinePayment,
    setFailMessage,
  } = useOnlinePaymentStatus();

  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();

  const { getUserData } = useUser();

  const dispatch = useDispatch();
  const { divergence } = useSelector(
    (state: AppState): DivergenceState => state.divergence,
  );

  const makeDivergence = useCallback(async () => {
    startRequest();
    try {
      const divergenceSchema = await api.divergence.makeDivergence();
      dispatch(fillDivergence(divergenceSchema));
      open(Modals.Divergence);
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, [dispatch]);

  const resetDivergence = useCallback(() => {
    dispatch(fillDivergence(null));
  }, [dispatch]);

  const postDivergence = useCallback(async (divergenceData: DivergenceData) => {
    startRequest();
    try {
      const response = await api.divergence.postDivergence(divergenceData);
      // if cash or balance payment
      if (response.status === 200) {
        toastService.success('Расхождение по таре оплачено');
        await getUserData();
      }
      // if cashless payment
      if (response.status === 202) {
        const { paymentFormUrl } = response.data as PaymentPosition;
        window.location.href = paymentFormUrl;
      }
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, []);

  const successDivergence = useCallback(async (orderId: string) => {
    startRequest();
    setSuccessOnlinePayment(false);
    setFailureOnlinePayment(false);
    try {
      const response = await api.divergence.successDivergence(orderId);
      if (response.status === 200) {
        setSuccessOnlinePayment(true);
        await getUserData();
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

  const failDivergence = useCallback(async (orderId: string) => {
    startRequest();
    setSuccessOnlinePayment(false);
    setFailureOnlinePayment(false);
    try {
      const errorObject = await api.divergence.failDivergence(orderId);
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
    successOnlinePayment,
    failureOnlinePayment,
    failMessage,
    divergence,
    makeDivergence,
    postDivergence,
    successDivergence,
    failDivergence,
    resetDivergence,
  };
};
