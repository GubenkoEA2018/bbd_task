import { BasketActionTypes, BasketSchema, FILL_BASKET } from '../types/basket';

export type BasketState = {
  basket: BasketSchema | null;
};

const initialState: BasketState = {
  basket: null,
};

export const basketReducer = (
  state = initialState,
  action: BasketActionTypes,
): BasketState => {
  switch (action.type) {
    case FILL_BASKET:
      return {
        ...state,
        basket: action.basket,
      };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action.type;
  }
  return state;
};
