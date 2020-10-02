import { FILL_USER_DATA, User, UserActionTypes } from '../types/user';

export type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

export const userReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  switch (action.type) {
    case FILL_USER_DATA:
      return {
        ...state,
        user: action.user,
      };
    default:
      // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-unused-vars
      const x: never = action.type;
  }

  return state;
};
