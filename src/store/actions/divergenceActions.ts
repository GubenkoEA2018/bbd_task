import {
  DivergenceActionTypes,
  DivergenceSchema,
  FILL_DIVERGENCE,
} from '../types/divergence';

export const fillDivergence = (
  divergence: DivergenceSchema | null,
): DivergenceActionTypes => ({
  type: FILL_DIVERGENCE,
  divergence,
});
