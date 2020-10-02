import { Modify } from './address';

export type UserCreate = {
  id?: number;
  phone: string;
  email: string;
  surname?: string;
  firstName?: string;
  patronymic?: string;
  emailDeliveryNotification?: boolean;
  emailPromotionNotification?: boolean;
  smsNotification?: boolean;
};

export type UserPhoneChange = {
  user: {
    id: number;
    phone: string;
  };
  code: string;
};

export type User = Modify<UserCreate, { id: number }> & {
  balance: number;
  status: number;
  taraOnHands: number;
  taraPaid: number;
};

export const FILL_USER_DATA = 'FILL_USER_DATA';
type FillUserData = {
  type: typeof FILL_USER_DATA;
  user: User | null;
};

export type UserActionTypes = FillUserData;
