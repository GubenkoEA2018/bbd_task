import { OrderPosition } from './order';
import { PaymentTypeNumbers } from '../../utils/types';

export type DivergenceSchema = {
  id: number;
  orderSum: number;
  created_at: number;
  orderPositions: OrderPosition[];
  paymentType: PaymentTypeNumbers;
  status: number;
};

export type DivergenceData = {
  orderId: number;
  paymentType: PaymentTypeNumbers;
};

export const FILL_DIVERGENCE = 'FILL_DIVERGENCE';
export type FillDivergence = {
  type: typeof FILL_DIVERGENCE;
  divergence: DivergenceSchema | null;
};

export type DivergenceActionTypes = FillDivergence;
