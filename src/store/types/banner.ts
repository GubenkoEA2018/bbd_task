import { FavoriteProduct } from './favorite';

export type Banner = {
  id: number;
  name: string;
  description: string;
  isAbsoluteImagePath: boolean;
  imagePath: string;
};

type BannerPosition = FavoriteProduct;

export type BannerSchema = Banner & {
  status: number;
  bannerPositions: BannerPosition[];
};

export const FILL_BANNERS = 'FILL_BANNERS';
export type fillBannersAction = {
  type: typeof FILL_BANNERS;
  banners: Banner[];
};

export const FILL_BANNER = 'FILL_BANNER';
export type fillBannerAction = {
  type: typeof FILL_BANNER;
  banner: BannerSchema | null;
};

export type bannerActionTypes = fillBannersAction | fillBannerAction;
