import {
  DivergenceActionTypes,
  DivergenceSchema,
  FILL_DIVERGENCE,
} from '../types/divergence';

export type DivergenceState = {
  divergence: DivergenceSchema | null;
};

const initialState: DivergenceState = {
  divergence: null,
};

export const divergenceReducer = (
  state = initialState,
  action: DivergenceActionTypes,
): DivergenceState => {
  switch (action.type) {
    case FILL_DIVERGENCE:
      return {
        ...state,
        divergence: action.divergence,
      };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action.type;
  }
  return state;
};
