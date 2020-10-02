// Core
import { useCallback, useState } from 'react';

// Services
import { api } from '../services/api';
import { RequestState, useRequestState } from './useRequestState';
import { useUser } from './useUser';
import {
  OnlinePaymentStatus,
  useOnlinePaymentStatus,
} from './useOnlinePaymentStatus';

export type Sum = {
  sum: number;
};

type UseRefill = {
  refillBalance(sum: number): Promise<void>;
  refillSuccess(orderId: string): Promise<void>;
  refillFail(orderId: string): Promise<void>;
} & RequestState &
  OnlinePaymentStatus;

export const useRefill = (): UseRefill => {
  const { getUserData } = useUser();
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

  const refillBalance = useCallback(async (sum: number) => {
    startRequest();
    try {
      const { paymentFormUrl } = await api.refill.refillBalance({ sum });
      window.location.href = paymentFormUrl;
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, []);

  const refillSuccess = useCallback(async (orderId: string) => {
    startRequest();
    setSuccessOnlinePayment(false);
    setFailureOnlinePayment(false);
    try {
      const response = await api.refill.refillSuccess(orderId);
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

  const refillFail = useCallback(async (orderId: string) => {
    startRequest();
    setSuccessOnlinePayment(false);
    setFailureOnlinePayment(false);
    try {
      const errorObject = await api.refill.refillFail(orderId);
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
    refillBalance,
    refillSuccess,
    refillFail,
  };
};
