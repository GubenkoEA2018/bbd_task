export enum SmsStatusCodes {
  Success = 0,
}

export type SendSmsCodeResponseType = {
  result: {
    msg_id: string;
    status: {
      code: number;
      description: string;
    };
  };
};

export type RegistrationBodyType = {
  phone: string;
  code: string;
  firstName?: string;
  surname?: string;
  patronymic?: string;
  email?: string;
};

export type UserDataType = {
  userId: string | null;
  apikey: string | null;
};

export const SET_SMS_CODE = 'SET_SMS_CODE';
type SetSmsCodeAction = {
  type: typeof SET_SMS_CODE;
  codeStatus: number | null;
};

export const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA';
type SetUserAuthDataAction = {
  type: typeof SET_USER_AUTH_DATA;
} & UserDataType;

export type SecurityActionTypes = SetSmsCodeAction | SetUserAuthDataAction;
