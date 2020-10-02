import {
  Banner,
  bannerActionTypes,
  BannerSchema,
  FILL_BANNER,
  FILL_BANNERS,
} from '../types/banner';

export const fillBanners = (banners: Banner[]): bannerActionTypes => ({
  type: FILL_BANNERS,
  banners,
});

export const fillBanner = (banner: BannerSchema | null): bannerActionTypes => ({
  type: FILL_BANNER,
  banner,
});
