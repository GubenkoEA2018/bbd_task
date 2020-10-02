// Core
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Instruments
import { AppState } from '../store/rootReducer';
import { UserState } from '../store/reducers/userReducer';

// Actions
import { fillUserData } from '../store/actions/userActions';

// Services
import { api } from '../services/api';
import { UserCreate, UserPhoneChange } from '../store/types/user';
import { RequestState, useRequestState } from './useRequestState';

type UseUserType = {
  getUserData: () => void;
  updateUserData: (userData: UserCreate) => void;
  changeUserPhone: (data: UserPhoneChange) => void;
} & UserState &
  RequestState;

export const useUser = (): UseUserType => {
  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();

  const dispatch = useDispatch();

  const { user } = useSelector((state: AppState): UserState => state.user);

  const getUserData = useCallback(async () => {
    startRequest();
    try {
      // eslint-disable-next-line no-shadow
      const user = await api.user.me();
      dispatch(fillUserData(user));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const updateUserData = useCallback(async (userData: UserCreate) => {
    startRequest();
    try {
      // eslint-disable-next-line no-shadow
      const user = await api.user.update(userData);
      dispatch(fillUserData(user));
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, []);

  const changeUserPhone = useCallback(async (data: UserPhoneChange) => {
    startRequest();
    try {
      // eslint-disable-next-line no-shadow
      const user = await api.user.changePhone(data);
      dispatch(fillUserData(user));
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, []);

  return { loading, user, getUserData, updateUserData, changeUserPhone };
};
