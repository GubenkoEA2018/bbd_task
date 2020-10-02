import { AxiosInstance } from 'axios';
import { User, UserCreate, UserPhoneChange } from '../../../store/types/user';

export interface ApiUserInterface {
  http: AxiosInstance;
  update(user: UserCreate): Promise<User>;
  me(): Promise<User>;
  changePhone(data: UserPhoneChange): Promise<User>;
}

export class ApiUser implements ApiUserInterface {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async update(user: UserCreate): Promise<User> {
    const response = await this.http.patch<User>('/users', user);
    return response.data;
  }

  async me(): Promise<User> {
    const response = await this.http.get<User>('/me');
    return response.data;
  }

  async changePhone(data: UserPhoneChange): Promise<User> {
    const response = await this.http.patch<User>('/users/edit-phone', data);
    return response.data;
  }
}
