import { AxiosInstance } from 'axios';
import {
  BasketPositionCreate,
  BasketSchema,
} from '../../../store/types/basket';

export interface ApiBasketInterface {
  http: AxiosInstance;
  getBasket(): Promise<BasketSchema>;
  addToBasket(position: BasketPositionCreate): Promise<BasketSchema>;
  removeFromBasket(id: string): Promise<BasketSchema>;
}

export class ApiBasket implements ApiBasketInterface {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getBasket(): Promise<BasketSchema> {
    const response = await this.http.get<BasketSchema>('/baskets');
    return response.data;
  }

  async addToBasket(position: BasketPositionCreate): Promise<BasketSchema> {
    const response = await this.http.post<BasketSchema>(
      '/baskets/add-article',
      position,
    );
    return response.data;
  }

  async removeFromBasket(id: string): Promise<BasketSchema> {
    const response = await this.http.delete<BasketSchema>(
      `/baskets/position/${id}`,
    );
    return response.data;
  }
}
