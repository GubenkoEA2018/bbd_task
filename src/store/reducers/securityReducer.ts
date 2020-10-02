import {
  SecurityActionTypes,
  SET_SMS_CODE,
  SET_USER_AUTH_DATA,
} from '../types/security';

export type SecurityState = {
  codeStatus: number | null;
  userId: string | null;
  apikey: string | null;
};

const initialState: SecurityState = {
  codeStatus: null,
  userId: null,
  apikey: null,
};

export const securityReducer = (
  state = initialState,
  action: SecurityActionTypes,
): SecurityState => {
  switch (action.type) {
    case SET_SMS_CODE:
      return {
        ...state,
        codeStatus: action.codeStatus,
      };
    case SET_USER_AUTH_DATA:
      return {
        ...state,
        userId: action.userId,
        apikey: action.apikey,
      };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
