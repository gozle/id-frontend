import { Language } from '@lib/types';

import { api } from '../api';

import { GetLanguagesRequest, GetLanguagesResponse } from './language.type';

export const languageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLanguages: builder.query<Language[], GetLanguagesRequest>({
      query: () => 'languages',
      providesTags: (res) =>
        res
          ? [
              ...res.map((el) => ({ type: 'Language', id: el.id } as const)),
              { type: 'Language', id: 'LIST' },
            ]
          : [{ type: 'Language', id: 'LIST' }],
      transformResponse: (res: GetLanguagesResponse) =>
        res.map((el) => ({
          code: el.code,
          id: el.id,
          name: el.name,
          shortName: el.short_name,
        })),
    }),
  }),
});

export const { useGetLanguagesQuery } = languageApi;
