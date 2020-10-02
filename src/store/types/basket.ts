import { Price, PublishedProduct } from './catalog';

export type BasketSchema = {
  id: number;
  taraCost: number;
  totalItems: number;
  totalCost: number;
  basketPositions: BasketPosition[];
};

export type BasketPosition = {
  id: number;
  productId: number;
  isTara: boolean;
  product: PublishedProduct;
  price: Price;
} & BasketPositionCreate;

export type BasketPositionCreate = {
  amount: number;
  priceId: number;
};

export const FILL_BASKET = 'FILL_BASKET';
export type FillBasketAction = {
  type: typeof FILL_BASKET;
  basket: BasketSchema;
};

export type BasketActionTypes = FillBasketAction;
