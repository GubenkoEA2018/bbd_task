import { AxiosInstance } from 'axios';
import { Banner, BannerSchema } from '../../../store/types/banner';

export interface ApiBannersInterface {
  http: AxiosInstance;
  getBanners(): Promise<Banner[]>;
  getBanner(id: string): Promise<BannerSchema>;
}

export class ApiBanners implements ApiBannersInterface {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getBanners(): Promise<Banner[]> {
    const response = await this.http.get<Banner[]>('/banners');
    return response.data;
  }

  async getBanner(id: string): Promise<BannerSchema> {
    const response = await this.http.get<BannerSchema>(`/banners/${id}`);
    return response.data;
  }
}
