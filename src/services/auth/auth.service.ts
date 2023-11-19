import { LoginHistoryItem } from '@lib/types';

import { api } from '../api';

import {
  Activate2faRequest,
  Activate2faResponse,
  Check2faRequest,
  Check2faResponse,
  Deactivate2faRequest,
  Deactivate2faResponse,
  GetLoginHistoryRequest,
  GetLoginHistoryResponse,
  GetToken2faRequest,
  GetToken2faResponse,
  PasswordResetRegisterRequest,
  PasswordResetRegisterResponse,
  PasswordResetSaveRequest,
  PasswordResetSaveResponse,
  SendCodeRequest,
  SendCodeResponse,
  VerifyPhoneRequest,
  VerifyPhoneResponse,
} from './auth.type';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    activate2fa: builder.mutation<Activate2faResponse, Activate2faRequest>({
      query: (body) => {
        const fd = new FormData();

        fd.append('password', body.password);

        return { url: '2fa/activate', method: 'POST', body: fd };
      },
      invalidatesTags: ['2fa'],
    }),
    check2fa: builder.query<Check2faResponse, Check2faRequest>({
      query: () => ({ url: '2fa/check', method: 'POST' }),
      providesTags: ['2fa'],
    }),
    deactivate2fa: builder.mutation<
      Deactivate2faResponse,
      Deactivate2faRequest
    >({
      query: (body) => ({ url: '2fa/deactivate', method: 'POST', body }),
      invalidatesTags: ['2fa'],
    }),
    getToken2fa: builder.mutation<GetToken2faResponse, GetToken2faRequest>({
      query: (body) => {
        const fd = new FormData();

        fd.append('password', body.password);
        fd.append('token', body.token);

        return { url: '2fa/get-token', method: 'POST', body: fd };
      },
    }),
    sendCode: builder.mutation<SendCodeResponse, SendCodeRequest>({
      query: (body) => {
        const fd = new FormData();

        fd.append('phone_number', body.phoneNumber);

        return { url: 'auth/sign-up', method: 'POST', body: fd };
      },
    }),
    verifyPhone: builder.mutation<VerifyPhoneResponse, VerifyPhoneRequest>({
      query: (body) => {
        const fd = new FormData();

        fd.append('verification-code', body.code);
        fd.append('phone_number', body.phoneNumber);

        return { url: 'auth/verify', method: 'POST', body: fd };
      },
    }),
    getLoginHistory: builder.query<LoginHistoryItem[], GetLoginHistoryRequest>({
      query: () => 'history/login',
      forceRefetch: () => true,
      transformResponse: (res?: GetLoginHistoryResponse) =>
        res?.map((el) => ({
          browser: el.browser,
          createdAt: el.created_at,
          device: el.device,
          icon: el.icon,
          id: el.id,
          ip: el.ip_address,
          os: el.os,
        })) || [],
    }),
    passwordResetRegister: builder.mutation<
      PasswordResetRegisterResponse,
      PasswordResetRegisterRequest
    >({
      query: (body) => ({
        url: 'auth/forget-password/email',
        body: { email: body.email },
      }),
    }),
    passwordResetSave: builder.mutation<
      PasswordResetSaveResponse,
      PasswordResetSaveRequest
    >({
      query: (body) => ({
        url: 'auth/forget-password/email',
        body: {
          email: body.email,
          'verification-code': body.code,
          password: body.password,
        },
      }),
    }),
  }),
});

export const {
  useActivate2faMutation,
  useCheck2faQuery,
  useDeactivate2faMutation,
  useGetToken2faMutation,
  useSendCodeMutation,
  useVerifyPhoneMutation,

  useGetLoginHistoryQuery,

  usePasswordResetRegisterMutation,
  usePasswordResetSaveMutation,
} = authApi;
