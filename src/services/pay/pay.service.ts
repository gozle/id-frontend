import { Bank } from '@lib/types';

import { api } from '../api';

import {
  ApplyGiftCardRequest,
  ApplyGiftCardResponse,
  GetBalanceReplenishmentByBankCardRequest,
  GetBalanceReplenishmentByBankCardResponse,
  GetBankListRequest,
  GetBankListResponse,
  ReplenishBalanceByBankCardRequest,
  ReplenishBalanceByBankCardResponse,
} from './pay.type';

export const payApi = api.injectEndpoints({
  endpoints: (builder) => ({
    applyGiftCard: builder.mutation<
      ApplyGiftCardResponse,
      ApplyGiftCardRequest
    >({
      query: (body) => {
        const fd = new FormData();

        fd.append('code', body.code);

        return { url: 'enter-card', method: 'POST', body: fd };
      },
      invalidatesTags: ['Users'],
    }),
    getBankList: builder.query<Bank[] | undefined, GetBankListRequest>({
      query: () => 'banks',
      transformResponse: (res?: GetBankListResponse) =>
        res?.map((el) => ({ icon: el.icon, id: el.id, name: el.name })),
    }),
    replenishBalanceByBankCard: builder.mutation<
      ReplenishBalanceByBankCardResponse,
      ReplenishBalanceByBankCardRequest
    >({
      query: (body) => ({
        url: 'order/register',
        method: 'POST',
        body: {
          ...body,
          language: body.language === 'tk' ? 'tm' : body.language,
        },
      }),
    }),
    getBalanceReplenishmentByBankCard: builder.query<
      GetBalanceReplenishmentByBankCardResponse,
      GetBalanceReplenishmentByBankCardRequest
    >({
      query: (body) => ({ url: 'order/status', method: 'POST', body }),
    }),
  }),
});

export const {
  useApplyGiftCardMutation,
  useGetBankListQuery,
  useReplenishBalanceByBankCardMutation,
  useGetBalanceReplenishmentByBankCardQuery,
} = payApi;
