import {
  AddressActionTypes,
  AddressResponse,
  City,
  DELETE_ADDRESS,
  FILL_CITIES,
  FILL_CLIENT_ADDRESSES,
  FILL_ORDER_ADDRESSES,
  PUSH_CLIENT_ADDRESS,
  SET_ACTIVE_ADDRESS,
  UPDATE_ADDRESS,
  FILL_TARA,
  TaraByAddress,
} from '../types/address';

export type AddressState = {
  clientAddresses: AddressResponse[];
  orderAddresses: AddressResponse[];
  activeAddress: AddressResponse | null;
  cities: City[];
  tara: TaraByAddress[];
};

const initialState: AddressState = {
  clientAddresses: [],
  orderAddresses: [],
  activeAddress: null,
  cities: [],
  tara: [],
};

export const addressReducer = (
  state = initialState,
  action: AddressActionTypes,
): AddressState => {
  switch (action.type) {
    case FILL_CITIES:
      return {
        ...state,
        cities: action.cities,
      };
    case FILL_TARA:
      return {
        ...state,
        tara: action.tara,
      };
    case SET_ACTIVE_ADDRESS:
      return {
        ...state,
        activeAddress: action.address,
      };
    case FILL_CLIENT_ADDRESSES:
      return {
        ...state,
        clientAddresses: action.addresses,
      };
    case PUSH_CLIENT_ADDRESS:
      return {
        ...state,
        clientAddresses: [...state.clientAddresses, action.address],
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        clientAddresses: state.clientAddresses.filter(
          (a) => a.id !== action.id,
        ),
      };
    case UPDATE_ADDRESS: {
      const addressIndex = state.clientAddresses.findIndex(
        (a) => a.id === action.address.id,
      );
      return {
        ...state,
        clientAddresses: [
          ...state.clientAddresses.slice(0, addressIndex),
          action.address,
          ...state.clientAddresses.slice(addressIndex + 1),
        ],
      };
    }
    case FILL_ORDER_ADDRESSES:
      return {
        ...state,
        orderAddresses: action.addresses,
      };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
