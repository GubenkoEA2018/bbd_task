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

export type OrderState = {
  orders: OrderSchema[];
  createdOrder: OrderSchema | null;
  currentOrder: OrderSchema | null;
  date: DeliveryDate[];
  intervals: TimeInterval[];
};

const initialState: OrderState = {
  orders: [],
  createdOrder: null,
  currentOrder: null,
  date: [],
  intervals: [],
};

export const orderReducer = (
  state = initialState,
  action: OrderActionTypes,
): OrderState => {
  switch (action.type) {
    case FILL_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case FILL_CREATED_ORDER:
      return {
        ...state,
        createdOrder: action.order,
      };
    case FILL_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.order,
      };
    case FILL_DATE:
      return {
        ...state,
        date: action.date,
      };
    case FILL_INTERVALS:
      return {
        ...state,
        intervals: action.intervals,
      };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
