// Core
import { useCallback, useState, ChangeEvent } from 'react';

// Services
import { api } from '../services/api';
import {
  Brand,
  CatalogQuery,
  PriceFilter,
  PublishedProduct,
} from '../store/types/catalog';
import { RequestState, useRequestState } from './useRequestState';

type UseSearchProducts = {
  handleSearch(e: ChangeEvent<HTMLInputElement>): void;
  searchedProducts: PublishedProduct[];
  searchedBrands: Brand[];
  searchedPrices: PriceFilter | null;
  searchValue: string;
  resetSearchedProducts(): void;
  resetSearchedValue(): void;
  fetchSearchProducts(
    query: string,
    addMode?: boolean,
  ): Promise<PublishedProduct[] | undefined>;
} & RequestState;

const SEARCH_STR_LENGTH = 3;

export const useSearchProducts = (): UseSearchProducts => {
  const {
    loading,
    startRequest,
    stopRequest,
    setErrorMessage,
  } = useRequestState();

  const [searchValue, setSearchValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState<PublishedProduct[]>(
    [],
  );
  const [searchedBrands, setBrands] = useState<Brand[]>([]);
  const [searchedPrices, setPrices] = useState<PriceFilter | null>(null);

  const resetSearchedProducts = useCallback((): void => {
    setSearchedProducts([]);
  }, [setSearchedProducts]);

  const resetSearchedValue = useCallback((): void => {
    setSearchValue('');
  }, [setSearchValue]);

  const fetchSearchProducts = useCallback(
    async (
      query: string,
      addMode?: boolean,
    ): Promise<PublishedProduct[] | undefined> => {
      startRequest();
      try {
        const searchResult = await api.search.searchProducts(query);
        if (!searchResult) {
          return undefined;
        }
        const { products, brands, priceFilter } = searchResult || {};
        if (addMode) {
          setSearchedProducts((prev) => [...prev, ...products]);
        } else {
          setSearchedProducts(products);
          setBrands(brands);
          setPrices(priceFilter);
        }
        return products;
      } catch (e) {
        setErrorMessage(e);
        return undefined;
      } finally {
        stopRequest();
      }
    },
    [],
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchValue(value);
    if (value.length < SEARCH_STR_LENGTH) {
      resetSearchedProducts();
    } else {
      fetchSearchProducts(encodeURI(`${CatalogQuery.name}=${value}`));
    }
  };

  return {
    loading,
    handleSearch,
    searchedProducts,
    searchedPrices,
    searchedBrands,
    searchValue,
    resetSearchedProducts,
    fetchSearchProducts,
    resetSearchedValue,
  };
};
