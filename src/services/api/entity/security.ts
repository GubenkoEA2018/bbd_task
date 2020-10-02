import { AxiosInstance } from 'axios';
import {
  RegistrationBodyType,
  SendSmsCodeResponseType,
  UserDataType,
} from '../../../store/types/security';

export interface ApiSecurityInterface {
  http: AxiosInstance;
  signIn(registrationData: RegistrationBodyType): Promise<UserDataType>;
  sendSmsCode(phone: string): Promise<SendSmsCodeResponseType>;
}

export class ApiSecurity implements ApiSecurityInterface {
  http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  async signIn(registrationData: RegistrationBodyType): Promise<UserDataType> {
    const response = await this.http.post<UserDataType>(
      '/registration',
      registrationData,
    );
    return response.data;
  }

  async sendSmsCode(phone: string): Promise<SendSmsCodeResponseType> {
    const response = await this.http.post<SendSmsCodeResponseType>(
      '/send-sms-code',
      {
        phone,
      },
    );
    return response.data;
  }
}
