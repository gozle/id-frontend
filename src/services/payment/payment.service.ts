import { api } from '../api';

import {
  GetPaymentRequest,
  GetPaymentResponse,
  AcceptPaymentRequest,
  AcceptPaymentResponse,
} from './payment.type';

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPayment: builder.query<GetPaymentResponse, GetPaymentRequest>({
      query: (params) => ({ url: 'payment/get', params }),
    }),
    acceptPayment: builder.mutation<
      AcceptPaymentResponse,
      AcceptPaymentRequest
    >({
      query: () => 'payment/accept',
    }),
  }),
});

export const { useGetPaymentQuery, useAcceptPaymentMutation } = paymentApi;
