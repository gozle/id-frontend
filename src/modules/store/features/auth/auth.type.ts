import { PayloadAction } from '@reduxjs/toolkit';

import { User } from '@lib/types';

export interface Tokens {
  accessToken: string;
  refreshToken?: string;
}

export type AuthState = { isAuth: boolean; tokens?: Tokens; user?: User };

export type AuthReducers = {
  logout: () => AuthState;
  setAuthState: (
    state: AuthState,
    action: PayloadAction<Partial<AuthState>>,
  ) => AuthState;
};
