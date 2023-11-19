import { api } from '../api';

import {
  GetClientRequest,
  GetClientResponse,
  GetOAuthTokenRequest,
  GetOAuthTokenResponse,
} from './oauth.type';

export const oAuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getClient: builder.query<GetClientResponse, GetClientRequest>({
      query: (params) => ({ url: 'get/client', params }),
    }),
    getOAuthToken: builder.query<GetOAuthTokenResponse, GetOAuthTokenRequest>({
      query: () => 'get-oauth-token',
    }),
  }),
});

export const { useGetClientQuery, useLazyGetOAuthTokenQuery } = oAuthApi;
