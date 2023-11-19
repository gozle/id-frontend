import { api } from '../api';

import {
  RegisterReserveNumberRequest,
  RegisterReserveNumberResponse,
  ActivateReserveNumberRequest,
  ActivateReserveNumberResponse,
  DeactivateReserveNumberRequest,
  DeactivateReserveNumberResponse,
  GetReserveNumberRequest,
  GetReserveNumberResponse,
} from './security.type';

export const securityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deactivateReserveNumber: builder.mutation<
      DeactivateReserveNumberResponse,
      DeactivateReserveNumberRequest
    >({
      query: () => ({ url: 'reserve-number/deactivate', method: 'POST' }),
      invalidatesTags: ['Reserve Number'],
    }),
    getReserveNumber: builder.query<
      GetReserveNumberResponse | undefined,
      GetReserveNumberRequest
    >({
      query: () => 'reserve-number/get',
      transformResponse: (
        res:
          | { activated_at: string | null; reserve_phone_number: string }
          | undefined,
      ) =>
        res
          ? {
              activatedAt: res.activated_at,
              phoneNumber: res.reserve_phone_number,
            }
          : undefined,
      providesTags: ['Reserve Number'],
    }),
    activateReserveNumber: builder.mutation<
      ActivateReserveNumberResponse,
      ActivateReserveNumberRequest
    >({
      query: (body) => {
        const fd = new FormData();

        fd.append('phone_number', body.phoneNumber);
        fd.append('verification-code', body.code);

        return { url: 'reserve-number/activate', method: 'POST', body: fd };
      },
      invalidatesTags: ['Reserve Number'],
    }),
    registerReserveNumber: builder.mutation<
      RegisterReserveNumberResponse,
      RegisterReserveNumberRequest
    >({
      query: (body) => {
        const fd = new FormData();

        fd.append('phone_number', body.phoneNumber);

        return { url: 'reserve-number/register', method: 'POST', body: fd };
      },
    }),
  }),
});

export const {
  useActivateReserveNumberMutation,
  useDeactivateReserveNumberMutation,
  useGetReserveNumberQuery,
  useRegisterReserveNumberMutation,
} = securityApi;
