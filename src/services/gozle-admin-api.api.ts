import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { FEEDBACK_BASE_URL } from '@lib/constants';

export const gozleAdminApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: FEEDBACK_BASE_URL }),
  endpoints: () => ({}),
  reducerPath: 'gozleAdminApi',
  tagTypes: [],
});
