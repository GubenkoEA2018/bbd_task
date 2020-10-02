import { AxiosInstance, AxiosResponse } from 'axios';
import {
  DeliveryDate,
  OnlinePaymentOrderError,
  OrderData,
  OrderSchema,
  PaymentPosition,
  TimeInterval,
  TrackingBody,
} from '../../../store/types/order';

export interface ApiOrderInterface {
  http: AxiosInstance;
  getOrders(): Promise<OrderSchema[]>;
  getOrder(id: string): Promise<OrderSchema>;
  makeOrder(): Promise<OrderSchema>;
  postOrder(
    orderData: OrderData,
  ): Promise<AxiosResponse<OrderSchema | PaymentPosition>>;
  getDate(): Promise<DeliveryDate[]>;
  getTime(): Promise<TimeInterval[]>;
  getTrack(trackInfo: TrackingBody): Promise<OrderSchema[]>;
  retryOrder(orderId: string): Promise<AxiosResponse>;
  onlineSuccessOrder(orderId: string): Promise<AxiosResponse>;
  onlineFailOrder(orderId: string): Promise<OnlinePaymentOrderError>;
}

export class ApiOrder implements ApiOrderInterface {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getOrders(): Promise<OrderSchema[]> {
    const response = await this.http.get<OrderSchema[]>('/orders-by-client');
    return response.data;
  }

  async getOrder(id: string): Promise<OrderSchema> {
    const response = await this.http.get<OrderSchema>(`/orders/${id}`);
    return response.data;
  }

  async makeOrder(): Promise<OrderSchema> {
    const response = await this.http.get<OrderSchema>('/orders/make-order');
    return response.data;
  }

  async postOrder(
    orderData: OrderData,
  ): Promise<AxiosResponse<OrderSchema | PaymentPosition>> {
    return this.http.post<OrderSchema | PaymentPosition>('/orders', orderData);
  }

  async getDate(): Promise<DeliveryDate[]> {
    const response = await this.http.get<DeliveryDate[]>('/delivery-dates');
    return response.data;
  }

  async getTime(): Promise<TimeInterval[]> {
    const response = await this.http.get<TimeInterval[]>('/time-intervals');
    return response.data;
  }

  async getTrack(trackInfo: TrackingBody): Promise<OrderSchema[]> {
    const response = await this.http.post<OrderSchema[]>(
      '/orders/tracking',
      trackInfo,
    );
    return response.data;
  }

  async retryOrder(orderId: string): Promise<AxiosResponse> {
    return this.http.get<AxiosResponse>(`/orders/retry?orderId=${orderId}`);
  }

  async onlineSuccessOrder(orderId: string): Promise<AxiosResponse> {
    return this.http.get<AxiosResponse>(
      `/orders/confirm/success-order?orderId=${orderId}`,
    );
  }

  async onlineFailOrder(orderId: string): Promise<OnlinePaymentOrderError> {
    const response = await this.http.get<OnlinePaymentOrderError>(
      `/orders/confirm/fail-order?orderId=${orderId}`,
    );
    return response.data;
  }
}
