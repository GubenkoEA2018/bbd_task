// Core
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash.isempty';

// Instruments
import { AppState } from '../store/rootReducer';
import { CatalogState } from '../store/reducers/catalogReducer';

// Actions
import {
  fillCategory,
  fillProducts,
  fillProduct,
  pushProducts,
  fillBrands,
  fillPrices,
  fillBestsellers,
  fillPopular,
} from '../store/actions/catalogActions';

// Services
import { api } from '../services/api';
import { Brand, Product, PublishedProduct } from '../store/types/catalog';
import { RequestState, useRequestState } from './useRequestState';

type UseCatalog = {
  getProductList: (
    query: string,
    pushing?: boolean,
  ) => Promise<PublishedProduct[]>;
  getProduct: (id: string) => void;
  getCategoryList: () => void;
  getBestsellers: () => void;
  getPopular: () => void;
  clearProductList: () => void;
} & CatalogState &
  RequestState;

// Helper
const mapProducts = (list: Product[]): PublishedProduct[] => {
  return list.reduce((result: PublishedProduct[], productItem) => {
    if (
      'publishedChildCategories' in productItem &&
      productItem.publishedChildCategories.length
    ) {
      const pubProducts = productItem.publishedChildCategories.flatMap((p) => {
        if ('publishedProducts' in p) {
          return p.publishedProducts;
        }
        return [];
      });
      return [...result, ...pubProducts];
    }
    if (
      'publishedProducts' in productItem &&
      productItem.publishedProducts.length
    ) {
      return [...result, ...productItem.publishedProducts];
    }

    return result;
  }, []);
};

export const useCatalog = (): UseCatalog => {
  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();

  const dispatch = useDispatch();

  useEffect(() => {
    return (): void => {
      dispatch(fillProduct(null));
      dispatch(fillProducts([]));
    };
  }, []);

  const {
    category,
    products,
    product,
    brands,
    prices,
    popular,
    bestsellers,
  } = useSelector((state: AppState): CatalogState => state.catalog);

  const clearProductList = useCallback(() => {
    dispatch(fillProducts([]));
  }, [dispatch]);

  const getCategoryList = useCallback(async () => {
    startRequest();
    try {
      // eslint-disable-next-line no-shadow
      const categories = await api.categories.getCategories();
      dispatch(fillCategory(categories));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const getProductList = useCallback(async (query: string, pushing = false) => {
    startRequest();
    try {
      const data = await api.categories.getProducts(query);
      // eslint-disable-next-line no-shadow
      const { brands, categories, priceFilter } = data || {};
      // eslint-disable-next-line no-shadow
      let products: PublishedProduct[] = [];
      // eslint-disable-next-line no-shadow
      let brandList: Brand[] = [];

      if (categories && categories.length) {
        // products
        if (
          'publishedChildCategories' in categories[0] &&
          categories[0].publishedChildCategories.length
        ) {
          products = categories[0].publishedChildCategories.flatMap((p) => {
            if ('publishedProducts' in p) {
              return p.publishedProducts;
            }
            return [];
          });
        } else if (
          'publishedProducts' in categories[0] &&
          categories[0].publishedProducts.length
        ) {
          products = categories[0].publishedProducts;
        }
      }

      // brands
      if (brands && brands.length) {
        brandList = brands;
      }

      if (pushing) {
        dispatch(pushProducts(products));
      } else {
        dispatch(fillProducts(products));
        dispatch(fillBrands(brandList));
        if (
          priceFilter &&
          !isEmpty(priceFilter) &&
          'minPrice' in priceFilter &&
          'maxPrice' in priceFilter
        ) {
          dispatch(fillPrices(priceFilter));
        }
      }

      return products;
    } catch (e) {
      setErrorMessage(e);
      return [];
    } finally {
      stopRequest();
    }
  }, []);

  const getProduct = useCallback(async (id: string) => {
    startRequest();
    try {
      // eslint-disable-next-line no-shadow
      const product = await api.categories.getProduct(id);
      dispatch(fillProduct(product));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const getBestsellers = useCallback(async () => {
    startRequest();
    try {
      let bestsellerList: PublishedProduct[] = [];
      const productList = await api.categories.getBestsellers();
      if (productList && productList.length) {
        bestsellerList = mapProducts(productList);
      }
      dispatch(fillBestsellers(bestsellerList));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  const getPopular = useCallback(async () => {
    startRequest();
    try {
      let popularList: PublishedProduct[] = [];
      const productList = await api.categories.getPopular();
      if (productList && productList.length) {
        popularList = mapProducts(productList);
      }
      dispatch(fillPopular(popularList));
    } catch (e) {
      setErrorMessage(e);
    } finally {
      stopRequest();
    }
  }, []);

  return {
    getCategoryList,
    getProduct,
    getProductList,
    category,
    products,
    product,
    loading,
    brands,
    prices,
    bestsellers,
    popular,
    getBestsellers,
    getPopular,
    clearProductList,
  };
};
