// Core
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Instruments
import { AppState } from '../store/rootReducer';
import { SecurityState } from '../store/reducers/securityReducer';

// Actions
import { setSmsCode, setUserAuthData } from '../store/actions/securityActions';

// Services
import { api } from '../services/api';
import { RegistrationBodyType } from '../store/types/security';
import { LocalStorageItem } from '../utils/types';
import { RequestState, useRequestState } from './useRequestState';

type UseSecurityType = RequestState &
  SecurityState & {
    sendSmsCode: (phone: string) => void;
    login: (user: RegistrationBodyType) => void;
    logout: () => void;
    resetSmsStatus: () => void;
    initUserAuthData: (userId: string | null, apikey: string | null) => void;
  };

export const useSecurity = (): UseSecurityType => {
  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();

  const dispatch = useDispatch();

  const { apikey, userId, codeStatus } = useSelector(
    (state: AppState): SecurityState => state.security,
  );

  const resetSmsStatus = useCallback(() => {
    dispatch(setSmsCode(null));
  }, [dispatch]);

  const sendSmsCode = useCallback(
    async (phoneNumber: string) => {
      startRequest();
      try {
        const response = await api.security.sendSmsCode(phoneNumber);
        const { code } = response.result.status;
        dispatch(setSmsCode(code));
      } catch (e) {
        setErrorMessage(e);
      } finally {
        stopRequest();
      }
    },
    [dispatch],
  );

  const initUserAuthData = useCallback(
    // eslint-disable-next-line no-shadow
    (userId: string | null, apikey: string | null) => {
      dispatch(setUserAuthData(userId, apikey));
    },
    [dispatch],
  );

  const login = useCallback(async (user: RegistrationBodyType) => {
    startRequest();
    try {
      const userData = await api.security.signIn(user);
      // eslint-disable-next-line no-shadow
      const { userId, apikey } = userData;
      initUserAuthData(userId, apikey);

      localStorage.setItem('user', JSON.stringify({ userId, apikey }));
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(LocalStorageItem.user);
    document.location.replace('/');
  }, []);

  return {
    apikey,
    userId,
    codeStatus,
    loading,
    sendSmsCode,
    login,
    logout,
    initUserAuthData,
    resetSmsStatus,
  };
};
