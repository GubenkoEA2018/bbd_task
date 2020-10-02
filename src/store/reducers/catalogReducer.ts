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

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 0;

export type CatalogState = {
  category: CategoryList | null;
  products: PublishedProduct[];
  brands: Brand[];
  prices: PriceFilter;
  product: PublishedProduct | null;
  bestsellers: PublishedProduct[];
  popular: PublishedProduct[];
};

const initialState: CatalogState = {
  category: null,
  products: [],
  brands: [],
  product: null,
  prices: {
    minPrice: DEFAULT_MIN_PRICE,
    maxPrice: DEFAULT_MAX_PRICE,
  },
  bestsellers: [],
  popular: [],
};

export const catalogReducer = (
  state = initialState,
  action: CatalogActionTypes,
): CatalogState => {
  switch (action.type) {
    case FILL_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case FILL_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case FILL_BRANDS:
      return {
        ...state,
        brands: action.brands,
      };
    case FILL_PRICES:
      return {
        ...state,
        prices: {
          minPrice: Math.trunc(action.prices.minPrice / 100),
          maxPrice: Math.ceil(action.prices.maxPrice / 100),
        },
      };
    case FILL_PRODUCTS:
      return {
        ...state,
        products: action.products,
      };
    case FILL_BESTSELLERS:
      return {
        ...state,
        bestsellers: action.bestsellers,
      };
    case FILL_POPULAR:
      return {
        ...state,
        popular: action.popular,
      };
    case PUSH_PRODUCTS:
      return {
        ...state,
        products: [...state.products, ...action.products],
      };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }

  return state;
};
