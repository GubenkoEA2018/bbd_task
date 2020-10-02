import { AxiosInstance, AxiosResponse } from 'axios';
import { Sum } from '../../../hooks/useRefill';
import {
  OnlinePaymentOrderError,
  PaymentPosition,
} from '../../../store/types/order';

export interface ApiRefillInterface {
  http: AxiosInstance;
  refillBalance(sum: Sum): Promise<PaymentPosition>;
  refillSuccess(orderId: string): Promise<AxiosResponse>;
  refillFail(orderId: string): Promise<OnlinePaymentOrderError>;
}

export class ApiRefill implements ApiRefillInterface {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async refillBalance(sum: Sum): Promise<PaymentPosition> {
    const response = await this.http.post<PaymentPosition>(
      '/balance/refill',
      sum,
    );
    return response.data;
  }

  async refillSuccess(orderId: string): Promise<AxiosResponse> {
    return this.http.get<AxiosResponse>(
      `/balance/confirm/success-refill?orderId=${orderId}`,
    );
  }

  async refillFail(orderId: string): Promise<OnlinePaymentOrderError> {
    const response = await this.http.get<OnlinePaymentOrderError>(
      `/balance/confirm/fail-refill?orderId=${orderId}`,
    );
    return response.data;
  }
}
