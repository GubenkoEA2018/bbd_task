import axios, { AxiosInstance, Canceler } from 'axios';
import { SearchProducts } from '../../../store/types/catalog';
import {
  SearchAddressBody,
  SearchAddresses,
} from '../../../store/types/address';

export interface ApiSearchInterface {
  http: AxiosInstance;
  searchProducts(query: string): Promise<SearchProducts | void>;
  searchAddress(address: SearchAddressBody): Promise<SearchAddresses | void>;
}

export class ApiSearch implements ApiSearchInterface {
  http: AxiosInstance;

  productsCanceler: Canceler | null;

  addressCanceler: Canceler | null;

  constructor(http: AxiosInstance) {
    this.http = http;
    this.productsCanceler = null;
    this.addressCanceler = null;
  }

  async searchProducts(query: string): Promise<SearchProducts | void> {
    if (this.productsCanceler) {
      this.productsCanceler();
    }

    try {
      const response = await this.http.get<SearchProducts>(
        `/search/products?${query}`,
        {
          cancelToken: new axios.CancelToken((c) => {
            this.productsCanceler = c;
          }),
        },
      );
      return response.data;
    } catch (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled');
      } else {
        throw thrown;
      }
      return undefined;
    }
  }

  async searchAddress(
    address: SearchAddressBody,
  ): Promise<SearchAddresses | void> {
    if (this.addressCanceler) {
      this.addressCanceler();
    }

    try {
      const response = await this.http.post<SearchAddresses>(
        '/dadata/suggest/address',
        address,
        {
          cancelToken: new axios.CancelToken((c) => {
            this.addressCanceler = c;
          }),
        },
      );

      return response.data;
    } catch (thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled');
      } else {
        throw thrown;
      }
      return undefined;
    }
  }
}
