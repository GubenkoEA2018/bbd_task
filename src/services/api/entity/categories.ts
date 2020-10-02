import { AxiosInstance } from 'axios';
import {
  CategoryList,
  Product,
  Products,
  PublishedProduct,
} from '../../../store/types/catalog';

export interface ApiCategoriesInterface {
  http: AxiosInstance;
  getProducts(query?: string): Promise<Products>;
  getCategories(): Promise<CategoryList>;
  getProduct(id: string): Promise<PublishedProduct>;
  getBestsellers(): Promise<Product[]>;
  getPopular(): Promise<Product[]>;
}

export class ApiCategories implements ApiCategoriesInterface {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getProducts(query = ''): Promise<Products> {
    const response = await this.http.get<Products>(`/categories?${query}`);
    return response.data;
  }

  async getCategories(): Promise<CategoryList> {
    const response = await this.http.get<CategoryList>('/type-categories/list');
    return response.data;
  }

  async getProduct(id: string): Promise<PublishedProduct> {
    const response = await this.http.get<PublishedProduct>(`/products/${id}`);
    return response.data;
  }

  async getBestsellers(): Promise<Product[]> {
    const response = await this.http.get<Product[]>('/categories/bestsellers');
    return response.data;
  }

  async getPopular(): Promise<Product[]> {
    const response = await this.http.get<Product[]>('/categories/popular');
    return response.data;
  }
}
