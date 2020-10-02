export enum AddressStatuses {
  Checked = 1,
  OnChecking = 11,
  Declined = 21,
  Deleted = 22,
}

export type AddressBody = {
  id?: number;
  name: string;
  contacts: Array<ContactCreate>;
  city: City;
  street: string;
  house: string;
  flat: number;
  entry: string;
  doorphone: string;
  floor: number;
};

export type Modify<T, R> = Omit<T, keyof R> & R;

export type AddressResponse = Modify<
  AddressBody,
  { contacts: ContactResponse[]; id: number }
> & {
  disableReason: string;
  fullAddress: string;
  status: number;
  statusName: string;
};

export type ContactCreate = {
  id?: number;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
};

export type ContactResponse = Modify<ContactCreate, { id: number }> & {
  fullName: string;
};

export type City = {
  id: number;
  name?: string;
};

export type TaraByAddress = {
  id: number;
  taraOnHands: number;
  taraPaid: number;
};

export type SearchAddress = {
  street?: string;
  house?: string;
  flat?: string;
};

export type SearchAddressBody = SearchAddress & {
  city: string;
};

export type SearchAddresses = {
  addresses: SearchAddress[];
};

export const FILL_TARA = 'FILL_TARA';
type FillTaraAction = {
  type: typeof FILL_TARA;
  tara: TaraByAddress[];
};

export const FILL_CITIES = 'FILL_CITIES';
type FillCitiesAction = {
  type: typeof FILL_CITIES;
  cities: City[];
};

export const FILL_CLIENT_ADDRESSES = 'FILL_CLIENT_ADDRESSES';
type FillClientAddressesAction = {
  type: typeof FILL_CLIENT_ADDRESSES;
  addresses: AddressResponse[];
};

export const PUSH_CLIENT_ADDRESS = 'PUSH_CLIENT_ADDRESS';
type PushClientAddressAction = {
  type: typeof PUSH_CLIENT_ADDRESS;
  address: AddressResponse;
};

export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
type UpdateAddressAction = {
  type: typeof UPDATE_ADDRESS;
  address: AddressResponse;
};

export const DELETE_ADDRESS = 'DELETE_ADDRESS';
type DeleteAddress = {
  type: typeof DELETE_ADDRESS;
  id: number;
};

export const FILL_ORDER_ADDRESSES = 'FILL_ORDER_ADDRESSES';
type FillOrderAddressesAction = {
  type: typeof FILL_ORDER_ADDRESSES;
  addresses: AddressResponse[];
};

export const SET_ACTIVE_ADDRESS = 'SET_ACTIVE_ADDRESS';
type SetActiveAddressAction = {
  type: typeof SET_ACTIVE_ADDRESS;
  address: AddressResponse;
};

export type AddressActionTypes =
  | FillClientAddressesAction
  | PushClientAddressAction
  | DeleteAddress
  | FillOrderAddressesAction
  | UpdateAddressAction
  | SetActiveAddressAction
  | FillCitiesAction
  | FillTaraAction;
