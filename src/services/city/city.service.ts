import { City } from '@lib/types';

import { api } from '../api';

import { GetCitiesRequest, GetCitiesResponse } from './city.type';

export const cityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query<City[], GetCitiesRequest>({
      query: ({ lang, regionId }) => `cities?region=${regionId}&lang=${lang}`,
      providesTags: (res) =>
        res
          ? [
              ...res.map((el) => ({ type: 'City', id: el.id } as const)),
              { type: 'City', id: 'LIST' },
            ]
          : [{ type: 'City', id: 'LIST' }],
      transformResponse: (res: GetCitiesResponse) => res,
    }),
  }),
});

export const { useGetCitiesQuery } = cityApi;
