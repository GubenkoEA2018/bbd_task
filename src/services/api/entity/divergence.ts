import { AxiosInstance, AxiosResponse } from 'axios';
import {
  DivergenceData,
  DivergenceSchema,
} from '../../../store/types/divergence';
import {
  OnlinePaymentOrderError,
  PaymentPosition,
} from '../../../store/types/order';

export interface ApiDivergenceInterface {
  http: AxiosInstance;
  makeDivergence(): Promise<DivergenceSchema>;
  postDivergence(
    divergenceData: DivergenceData,
  ): Promise<AxiosResponse<DivergenceSchema | PaymentPosition>>;
  successDivergence(orderId: string): Promise<AxiosResponse>;
  failDivergence(orderId: string): Promise<OnlinePaymentOrderError>;
}

export class ApiDivergence implements ApiDivergenceInterface {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async makeDivergence(): Promise<DivergenceSchema> {
    const response = await this.http.get<DivergenceSchema>(
      '/tara/make-divergence',
    );
    return response.data;
  }

  async postDivergence(
    divergenceData: DivergenceData,
  ): Promise<AxiosResponse<DivergenceSchema | PaymentPosition>> {
    return this.http.post<DivergenceSchema | PaymentPosition>(
      '/tara/divergence',
      divergenceData,
    );
  }

  async successDivergence(orderId: string): Promise<AxiosResponse> {
    return this.http.get<AxiosResponse>(
      `/tara/confirm/success-divergence?orderId=${orderId}`,
    );
  }

  async failDivergence(orderId: string): Promise<OnlinePaymentOrderError> {
    const response = await this.http.get<OnlinePaymentOrderError>(
      `/tara/confirm/fail-divergence?orderId=${orderId}`,
    );
    return response.data;
  }
}
