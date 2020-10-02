// Core
import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
// Other
import { toastService } from '../services/toast';
import { getErrorMessage } from '../utils';

export type RequestState = {
  loading: boolean;
};

type UseRequestState = RequestState & {
  startRequest(): void;
  stopRequest(): void;
  setErrorMessage(e: AxiosError): void;
};

export const useRequestState = (): UseRequestState => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startRequest = useCallback(() => {
    setLoading(true);
    setError(null);
  }, []);

  const stopRequest = useCallback(() => {
    setLoading(false);
  }, []);

  const setErrorMessage = useCallback((e: AxiosError) => {
    setError(getErrorMessage(e));
  }, []);

  useEffect(() => {
    if (error !== null) {
      toastService.error(error);
    }
  }, [error]);

  return {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  };
};
