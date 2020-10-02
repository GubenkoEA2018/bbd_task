import { AxiosInstance, AxiosResponse } from 'axios';
import {
  AddressBody,
  AddressResponse,
  City,
  TaraByAddress,
} from '../../../store/types/address';

export interface ApiAddressInterface {
  http: AxiosInstance;
  getClientAddresses(): Promise<AddressResponse[]>;
  getOrderAddresses(): Promise<AddressResponse[]>;
  createAddress(address: AddressBody): Promise<AddressResponse>;
  updateAddress(address: AddressBody): Promise<AddressResponse>;
  deleteAddress(id: string): Promise<AxiosResponse>;
  getCities(): Promise<City[]>;
  getTaraByAddresses(): Promise<TaraByAddress[]>;
}

export class ApiAddress implements ApiAddressInterface {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async getClientAddresses(): Promise<AddressResponse[]> {
    const response = await this.http.get<AddressResponse[]>(
      '/addresses-by-client',
    );
    return response.data;
  }

  async getOrderAddresses(): Promise<AddressResponse[]> {
    const response = await this.http.get<AddressResponse[]>(
      '/addresses-for-order',
    );
    return response.data;
  }

  async createAddress(address: AddressBody): Promise<AddressResponse> {
    const response = await this.http.post<AddressResponse>(
      '/addresses',
      address,
    );
    return response.data;
  }

  async updateAddress(address: AddressBody): Promise<AddressResponse> {
    const response = await this.http.patch<AddressResponse>(
      '/addresses',
      address,
    );
    return response.data;
  }

  async deleteAddress(id: string): Promise<AxiosResponse> {
    return this.http.delete<AxiosResponse>(`/addresses/${id}`);
  }

  async getCities(): Promise<City[]> {
    const response = await this.http.get<City[]>('/cities');
    return response.data;
  }

  async getTaraByAddresses(): Promise<TaraByAddress[]> {
    const response = await this.http.get<TaraByAddress[]>('/tara-by-addresses');
    return response.data;
  }
}
