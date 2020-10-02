// Core
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Instruments
import { AppState } from '../store/rootReducer';
import { AddressState } from '../store/reducers/addressReducer';

// Actions
import {
  fillClientAddresses,
  fillOrderAddresses,
  pushClientAddress,
  deleteAddress,
  updateAddress,
  setActiveAddress,
  fillCities,
  fillTara,
} from '../store/actions/addressActions';

// Services
import { api } from '../services/api';
import { AddressBody, AddressResponse } from '../store/types/address';
import { RequestState, useRequestState } from './useRequestState';

type UseAddress = {
  getClientAddresses: () => void;
  getOrderAddresses: () => void;
  getCities: () => void;
  getTara: () => void;
  createUserAddress: (address: AddressBody) => void;
  updateUserAddress: (address: AddressBody) => void;
  deleteUserAddress: (id: number) => void;
  setActiveUserAddress: (address: AddressResponse) => void;
} & AddressState &
  RequestState;

export const useAddress = (): UseAddress => {
  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();

  const dispatch = useDispatch();
  const {
    orderAddresses,
    clientAddresses,
    activeAddress,
    cities,
    tara,
  } = useSelector((state: AppState): AddressState => state.address);

  const getTara = useCallback(async () => {
    startRequest();
    try {
      // eslint-disable-next-line no-shadow
      const tara = await api.address.getTaraByAddresses();
      dispatch(fillTara(tara));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const getCities = useCallback(async () => {
    startRequest();
    try {
      // eslint-disable-next-line no-shadow
      const cities = await api.address.getCities();
      dispatch(fillCities(cities));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const getClientAddresses = useCallback(async () => {
    startRequest();
    try {
      const addresses = await api.address.getClientAddresses();
      dispatch(fillClientAddresses(addresses));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const getOrderAddresses = useCallback(async () => {
    startRequest();
    try {
      const addresses = await api.address.getOrderAddresses();
      dispatch(fillOrderAddresses(addresses));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const createUserAddress = useCallback(async (address: AddressBody) => {
    startRequest();
    try {
      const newAddress = await api.address.createAddress(address);
      dispatch(pushClientAddress(newAddress));
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, []);

  const updateUserAddress = useCallback(async (address: AddressBody) => {
    startRequest();
    try {
      const updatedAddress = await api.address.updateAddress(address);
      dispatch(updateAddress(updatedAddress));
    } catch (e) {
      setErrorMessage(e);
      throw e;
    } finally {
      stopRequest();
    }
  }, []);

  const deleteUserAddress = useCallback(async (id: number) => {
    startRequest();
    try {
      await api.address.deleteAddress(id.toString());
      dispatch(deleteAddress(id));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const setActiveUserAddress = useCallback((address: AddressResponse) => {
    dispatch(setActiveAddress(address));
  }, []);

  return {
    orderAddresses,
    clientAddresses,
    loading,
    getClientAddresses,
    getOrderAddresses,
    createUserAddress,
    updateUserAddress,
    deleteUserAddress,
    activeAddress,
    setActiveUserAddress,
    getCities,
    cities,
    getTara,
    tara,
  };
};
