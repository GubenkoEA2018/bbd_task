import { PublishedProduct } from './catalog';
import { PaymentTypeNumbers } from '../../utils/types';

export enum OrderQuery {
  OrderId = 'orderId',
}

export enum PaymentTypes {
  'CashPayment' = 1,
  'OnlinePayment' = 2,
  'BalancePayment' = 3,
}

export const PaymentTypeDescription = {
  [PaymentTypes.CashPayment]: 'Наличными курьеру',
  [PaymentTypes.OnlinePayment]: 'Оплата банковской картой',
  [PaymentTypes.BalancePayment]: 'Списано с баланса',
};

export type DeliveryDate = {
  id: number;
  date: number;
};

export type TimeInterval = {
  id: number;
  nameInterval: string;
};

export type OrderSchema = {
  id: number;
  orderSum: number;
  created_at: number;
  fullDeliveryAddress: string;
  orderPositions: OrderPosition[];
  date: string;
  time: string;
  driver: string;
  status: number;
  paymentType: PaymentTypeNumbers;
  statusName: string;
  comment: string;
  doorphone: string;
};

export type OrderPosition = {
  id: number;
  productName: string;
  productPrice: number;
  productAmount: number;
  totalSum: number;
  status: number;
  productId: number;
  statusName: string;
  product: PublishedProduct;
};

export type OrderData = {
  orderId: number;
  addressId: number;
  dateId: number;
  timeId: number;
  comment: string;
  paymentType: number;
};

export type PaymentPosition = {
  paymentOrderId: string;
  paymentFormUrl: string;
};

export type TrackingBody = {
  orderIdOrEmail: string;
};

export type OnlinePaymentOrderError = { errorDescription: string };

export const FILL_CREATED_ORDER = 'FILL_CREATED_ORDER';
export type FillCreatedOrder = {
  type: typeof FILL_CREATED_ORDER;
  order: OrderSchema;
};

export const FILL_CURRENT_ORDER = 'FILL_CURRENT_ORDER';
export type FillCurrentOrder = {
  type: typeof FILL_CURRENT_ORDER;
  order: OrderSchema;
};

export const FILL_ORDERS = 'FILL_ORDERS';
export type FillOrders = {
  type: typeof FILL_ORDERS;
  orders: OrderSchema[];
};

export const FILL_DATE = 'FILL_DATE';
export type FillDate = {
  type: typeof FILL_DATE;
  date: DeliveryDate[];
};

export const FILL_INTERVALS = 'FILL_INTERVALS';
export type FillIntervals = {
  type: typeof FILL_INTERVALS;
  intervals: TimeInterval[];
};

export type OrderActionTypes =
  | FillCreatedOrder
  | FillOrders
  | FillCurrentOrder
  | FillDate
  | FillIntervals;
