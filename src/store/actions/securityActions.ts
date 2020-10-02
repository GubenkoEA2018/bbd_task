import {
  SecurityActionTypes,
  SET_SMS_CODE,
  SET_USER_AUTH_DATA,
} from '../types/security';

export const setSmsCode = (codeStatus: number | null): SecurityActionTypes => ({
  type: SET_SMS_CODE,
  codeStatus,
});

export const setUserAuthData = (
  userId: string | null,
  apikey: string | null,
): SecurityActionTypes => ({
  type: SET_USER_AUTH_DATA,
  userId,
  apikey,
});
