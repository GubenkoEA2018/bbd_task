import {
  Brand,
  CatalogActionTypes,
  CategoryList,
  FILL_BESTSELLERS,
  FILL_BRANDS,
  FILL_CATEGORY,
  FILL_POPULAR,
  FILL_PRICES,
  FILL_PRODUCT,
  FILL_PRODUCTS,
  PriceFilter,
  PublishedProduct,
  PUSH_PRODUCTS,
} from '../types/catalog';

export const fillCategory = (category: CategoryList): CatalogActionTypes => ({
  type: FILL_CATEGORY,
  category,
});

export const fillProducts = (
  products: PublishedProduct[],
): CatalogActionTypes => ({
  type: FILL_PRODUCTS,
  products,
});

export const fillBrands = (brands: Brand[]): CatalogActionTypes => ({
  type: FILL_BRANDS,
  brands,
});

export const fillPrices = (prices: PriceFilter): CatalogActionTypes => ({
  type: FILL_PRICES,
  prices,
});

export const fillProduct = (
  product: PublishedProduct | null,
): CatalogActionTypes => ({
  type: FILL_PRODUCT,
  product,
});

export const fillBestsellers = (
  bestsellers: PublishedProduct[],
): CatalogActionTypes => ({
  type: FILL_BESTSELLERS,
  bestsellers,
});

export const fillPopular = (
  popular: PublishedProduct[],
): CatalogActionTypes => ({
  type: FILL_POPULAR,
  popular,
});

export const pushProducts = (
  products: PublishedProduct[],
): CatalogActionTypes => ({
  type: PUSH_PRODUCTS,
  products,
});
