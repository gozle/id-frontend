import { User } from '@lib/types';

import { api } from '../api';

import {
  GetSelfResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from './user.type';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSelf: builder.query<User, void>({
      query: () => 'auth/get-user',
      providesTags: (res: User | undefined) =>
        res ? [{ type: 'Users', id: res.id }] : [],
      transformResponse: (data: GetSelfResponse): User => ({
        avatar: data.avatar,
        balance: data.balance,
        birthday: data.birthday,
        city: data.city,
        createdAt: data.created_at,
        email: data.email,
        firstName: data.first_name,
        gender: data.gender,
        id: data.id,
        language: data.language,
        lastName: data.last_name,
        phoneNumber: data.phone_number,
        region: data.region,
        theme: data.theme,
        username: data.username,
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (body) => {
        const fd = new FormData();

        if (body.avatar) fd.append('avatar', body.avatar);
        if (body.birthday) fd.append('birthday', body.birthday);
        if (body.email) fd.append('email', body.email);
        if (body.firstName) fd.append('first_name', body.firstName);
        if (body.lastName) fd.append('last_name', body.lastName);
        if (body.gender) fd.append('gender', body.gender);
        if (body.username) fd.append('username', body.username);

        if (body.city) fd.append('city', String(body.city));
        if (body.language) fd.append('language', String(body.language));
        if (body.region) fd.append('region', String(body.region));
        if (body.theme) fd.append('theme', body.theme);

        return { url: 'auth/update', method: 'POST', body: fd };
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useGetSelfQuery, useUpdateUserMutation } = userApi;
