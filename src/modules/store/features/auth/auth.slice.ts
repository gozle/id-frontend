import { createSlice } from '@reduxjs/toolkit';

import {
  LOCALSTORAGE_ACCESS_TOKEN,
  LOCALSTORAGE_REFRESH_TOKEN,
} from '@lib/constants';

import { AuthReducers, AuthState } from './auth.type';

const accessToken = localStorage.getItem(LOCALSTORAGE_ACCESS_TOKEN);
const refreshToken = localStorage.getItem(LOCALSTORAGE_REFRESH_TOKEN);
const initialState: AuthState = accessToken
  ? {
      isAuth: true,
      tokens: { accessToken, refreshToken: refreshToken || undefined },
    }
  : { isAuth: false };

export const authSlice = createSlice<AuthState, AuthReducers>({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.clear();

      return { isAuth: false };
    },
    setAuthState: (state, action) => {
      if (action.payload.tokens) {
        localStorage.setItem(
          LOCALSTORAGE_ACCESS_TOKEN,
          action.payload.tokens.accessToken,
        );
        if (action.payload.tokens.refreshToken)
          localStorage.setItem(
            LOCALSTORAGE_REFRESH_TOKEN,
            action.payload.tokens.refreshToken,
          );
      }

      return { ...state, ...action.payload };
    },
  },
});

export const { setAuthState, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
