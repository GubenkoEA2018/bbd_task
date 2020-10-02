import { FILL_USER_DATA, UserActionTypes, User } from '../types/user';

export const fillUserData = (user: User | null): UserActionTypes => ({
  type: FILL_USER_DATA,
  user,
});
