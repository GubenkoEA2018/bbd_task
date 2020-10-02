import {
  Banner,
  bannerActionTypes,
  BannerSchema,
  FILL_BANNER,
  FILL_BANNERS,
} from '../types/banner';

export type BannerState = {
  banners: Banner[];
  banner: BannerSchema | null;
};

const initialState: BannerState = {
  banners: [],
  banner: null,
};

export const bannerReducer = (
  state = initialState,
  action: bannerActionTypes,
): BannerState => {
  switch (action.type) {
    case FILL_BANNERS:
      return {
        ...state,
        banners: action.banners,
      };
    case FILL_BANNER:
      return {
        ...state,
        banner: action.banner,
      };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
