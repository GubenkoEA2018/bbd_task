// Core
import { useCallback, useState } from 'react';

// Services
import { api } from '../services/api';
import { RequestState, useRequestState } from './useRequestState';
import { SearchAddressBody, SearchAddress } from '../store/types/address';

type UseAddressSearch = {
  addresses: SearchAddress[];
  fetchAddresses(address: SearchAddressBody): void;
} & RequestState;

export const useAddressSearch = (): UseAddressSearch => {
  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();

  const [addresses, setAddresses] = useState<SearchAddress[]>([]);

  const fetchAddresses = useCallback(
    async (address: SearchAddressBody): Promise<void> => {
      startRequest();
      try {
        const response = await api.search.searchAddress(address);
        let addressList: SearchAddress[] = [];
        if (response && 'addresses' in response && response.addresses.length) {
          addressList = response.addresses;
        }
        setAddresses(addressList);
      } catch (e) {
        setErrorMessage(e);
      } finally {
        stopRequest();
      }
    },
    [],
  );

  return { loading, addresses, fetchAddresses };
};
