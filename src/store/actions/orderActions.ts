import {
  DeliveryDate,
  FILL_CREATED_ORDER,
  FILL_CURRENT_ORDER,
  FILL_DATE,
  FILL_INTERVALS,
  FILL_ORDERS,
  OrderActionTypes,
  OrderSchema,
  TimeInterval,
} from '../types/order';

export const fillCreatedOrder = (order: OrderSchema): OrderActionTypes => ({
  type: FILL_CREATED_ORDER,
  order,
});

export const fillCurrentOrder = (order: OrderSchema): OrderActionTypes => ({
  type: FILL_CURRENT_ORDER,
  order,
});

export const fillOrders = (orders: OrderSchema[]): OrderActionTypes => ({
  type: FILL_ORDERS,
  orders,
});

export const fillDate = (date: DeliveryDate[]): OrderActionTypes => ({
  type: FILL_DATE,
  date,
});

export const fillIntervals = (intervals: TimeInterval[]): OrderActionTypes => ({
  type: FILL_INTERVALS,
  intervals,
});
