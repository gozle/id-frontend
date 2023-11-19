import { Region } from '@lib/types';

import { api } from '../api';

import { GetRegionsRequest, GetRegionsResponse } from './region.type';

export const regionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRegions: builder.query<Region[], GetRegionsRequest>({
      query: ({ lang }) => `regions?lang=${lang}`,
      providesTags: (res) =>
        res
          ? [
              ...res.map((el) => ({ type: 'Region', id: el.id } as const)),
              { type: 'Region', id: 'LIST' },
            ]
          : [{ type: 'Region', id: 'LIST' }],
      transformResponse: (res: GetRegionsResponse) => res,
    }),
  }),
});

export const { useGetRegionsQuery } = regionApi;
