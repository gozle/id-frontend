import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import {
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { Mutex } from 'async-mutex';

import { API_URL } from '@lib/constants';
import { AppDispatch, AppState } from '@modules/store';
import { logout, setAuthState } from '@modules/store/features/auth';

import { JwtTokens } from './auth';

const mutex = new Mutex();

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const auth = (getState() as AppState).auth;

    if (auth.isAuth && auth.tokens) {
      const token = auth.tokens.accessToken;

      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const getState = api.getState as () => AppState;
        const dispatch = api.dispatch as AppDispatch;
        const authState = getState().auth;

        if (authState.isAuth) {
          const refreshResult = await baseQueryWithAuth(
            {
              url: 'token/refresh/',
              method: 'POST',
              body: { refresh: authState.tokens?.refreshToken },
            },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            // store the new token
            dispatch(
              setAuthState({
                isAuth: true,
                tokens: {
                  accessToken: (refreshResult.data as JwtTokens).access,
                  refreshToken: (refreshResult.data as JwtTokens).refresh,
                },
              }),
            );
            // retry the initial query
            result = await baseQueryWithAuth(args, api, extraOptions);
          } else api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQueryWithAuth(args, api, extraOptions);
    }
  }

  return result;
};
