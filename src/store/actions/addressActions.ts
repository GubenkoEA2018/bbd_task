import {
  AddressActionTypes,
  AddressResponse,
  DELETE_ADDRESS,
  FILL_CITIES,
  FILL_CLIENT_ADDRESSES,
  FILL_ORDER_ADDRESSES,
  PUSH_CLIENT_ADDRESS,
  SET_ACTIVE_ADDRESS,
  UPDATE_ADDRESS,
  FILL_TARA,
  City,
  TaraByAddress,
} from '../types/address';

export const fillCities = (cities: City[]): AddressActionTypes => ({
  type: FILL_CITIES,
  cities,
});

export const fillTara = (tara: TaraByAddress[]): AddressActionTypes => ({
  type: FILL_TARA,
  tara,
});

export const setActiveAddress = (
  address: AddressResponse,
): AddressActionTypes => ({
  type: SET_ACTIVE_ADDRESS,
  address,
});

export const fillClientAddresses = (
  addresses: AddressResponse[],
): AddressActionTypes => ({
  type: FILL_CLIENT_ADDRESSES,
  addresses,
});

export const pushClientAddress = (
  address: AddressResponse,
): AddressActionTypes => ({
  type: PUSH_CLIENT_ADDRESS,
  address,
});

export const updateAddress = (
  address: AddressResponse,
): AddressActionTypes => ({
  type: UPDATE_ADDRESS,
  address,
});

export const deleteAddress = (id: number): AddressActionTypes => ({
  type: DELETE_ADDRESS,
  id,
});

export const fillOrderAddresses = (
  addresses: AddressResponse[],
): AddressActionTypes => ({
  type: FILL_ORDER_ADDRESSES,
  addresses,
});
