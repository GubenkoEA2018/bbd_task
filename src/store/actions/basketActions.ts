import { BasketActionTypes, BasketSchema, FILL_BASKET } from '../types/basket';

export const fillBasket = (basket: BasketSchema): BasketActionTypes => ({
  type: FILL_BASKET,
  basket,
});
