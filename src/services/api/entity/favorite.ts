import { AxiosInstance, AxiosResponse } from 'axios';
import { FavoriteProduct } from '../../../store/types/favorite';

export interface ApiFavoriteInterface {
  http: AxiosInstance;
  getFavorites(): Promise<FavoriteProduct[]>;
  addFavorite(favorite: FavoriteProduct): Promise<FavoriteProduct>;
  removeFavorite(id: string): Promise<AxiosResponse>;
}

export class ApiFavorite implements ApiFavoriteInterface {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getFavorites(): Promise<FavoriteProduct[]> {
    const response = await this.http.get<FavoriteProduct[]>('/favorites');
    return response.data;
  }

  async addFavorite(favorite: FavoriteProduct): Promise<FavoriteProduct> {
    const response = await this.http.post<FavoriteProduct>(
      '/favorites',
      favorite,
    );
    return response.data;
  }

  async removeFavorite(id: string): Promise<AxiosResponse> {
    return this.http.delete<AxiosResponse>(`/favorites/${id}`);
  }
}
