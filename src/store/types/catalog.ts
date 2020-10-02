// api/products/{id}
export type ParentCategory = {
  id: number;
  name: string;
  imagePath: string | null;
  parentCategory: ParentCategory | null;
};

// --------------------------
export enum CatalogQuery {
  category = 'filter[category]',
  subcategory = 'filter[subcategory]',
  priceMin = 'filter[price][min]',
  priceMax = 'filter[price][max]',
  name = 'filter[name]',
  page = 'filter[pagination][page]',
  perPage = 'filter[pagination][per_page]',
  brand = 'filter[brand][]',
}

export enum PriceType {
  sell = 1,
  rent = 2,
}

export type PriceFilter = {
  minPrice: number;
  maxPrice: number;
};

export type Products = {
  categories: Product[];
  brands: Brand[];
  priceFilter: PriceFilter;
};

export type SearchProducts = {
  products: PublishedProduct[];
  brands: Brand[];
  priceFilter: PriceFilter;
};

export type Product = {
  id: number;
  name: string;
  isAbsolutePath: boolean;
  status: number;
  imagePath: string | null;
  publishedProducts: Array<PublishedProduct>;
  publishedChildCategories: Array<PublishedChildCategory>;
  statusName: string;
};

export type PublishedChildCategory = {
  id: number;
  name: string;
  imagePath: string | null;
  publishedProducts: Array<PublishedProduct>;
  publishedChildCategories: Array<PublishedChildCategory>;
  statusName: string;
};

// api/categories product
export type PublishedProduct = {
  id: number;
  name: string;
  prices: Array<Price>;
  imageProducts: Array<ImageProduct>;
  requireTara: boolean;
  isBestseller: boolean;
  isPopular: boolean;
  shortDescription: string;
  category: ParentCategory;
  articleSupplier: string;
  articleKingswater: string;
  rateVAT: number;
  description: string;
  isWeightedProduct: boolean;
  isFreeShipping: boolean;
  brand: Brand;
  unit: {
    id: number;
    unit: string;
  };
  country: {
    id: number;
    name: string;
  };
  quantityInOnePackage: number;
  remainsOnStock: number;
  isTara: boolean;
};

export type Brand = {
  id: number;
  name: string;
};

export type Price = {
  status?: string;
  id: number;
  price: number;
  bannerPrice: number;
  productId: number;
  typePrice: number;
};

export type ImageProduct = {
  id: number;
  imagePath: string;
  productId: number;
  isAbsolutePath: boolean;
};

// -------------- Category types
export type CategoryList = CategoryType[];

export type CategoryType = {
  id: number;
  name: string;
  category: Array<Catalog>;
};

export type Catalog = {
  id: number;
  name: string;
  imagePath: string;
  publishedChildCategories: Array<SubCategory>;
};

export type SubCategory = {
  id: number;
  name: string;
  imagePath: string;
  publishedChildCategories: Array<unknown>;
};

// ----------------------- Redux Types
export const FILL_CATEGORY = 'FILL_CATEGORY';
type FillUserDataAction = {
  type: typeof FILL_CATEGORY;
  category: CategoryList;
};

export const FILL_PRODUCTS = 'FILL_PRODUCTS';
type FillProductsAction = {
  type: typeof FILL_PRODUCTS;
  products: PublishedProduct[];
};

export const FILL_BRANDS = 'FILL_BRANDS';
type FillBrandsAction = {
  type: typeof FILL_BRANDS;
  brands: Brand[];
};

export const FILL_PRICES = 'FILL_PRICES';
type FillPricesAction = {
  type: typeof FILL_PRICES;
  prices: PriceFilter;
};

export const FILL_PRODUCT = 'FILL_PRODUCT';
type FillProductAction = {
  type: typeof FILL_PRODUCT;
  product: PublishedProduct | null;
};

export const FILL_BESTSELLERS = 'FILL_BESTSELLERS';
type FillBestsellersAction = {
  type: typeof FILL_BESTSELLERS;
  bestsellers: PublishedProduct[];
};

export const FILL_POPULAR = 'FILL_POPULAR';
type FillPopularAction = {
  type: typeof FILL_POPULAR;
  popular: PublishedProduct[];
};

export const PUSH_PRODUCTS = 'PUSH_PRODUCTS';
type PushProductsAction = {
  type: typeof PUSH_PRODUCTS;
  products: PublishedProduct[];
};

export type CatalogActionTypes =
  | FillUserDataAction
  | FillProductsAction
  | PushProductsAction
  | FillProductAction
  | FillBrandsAction
  | FillPricesAction
  | FillBestsellersAction
  | FillPopularAction;
