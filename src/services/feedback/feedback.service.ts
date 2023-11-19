import { gozleAdminApi } from '../gozle-admin-api.api';

import type { SendFeedbackRequest } from './feedback.type';

export const feedbackApi = gozleAdminApi.injectEndpoints({
  endpoints: (builder) => ({
    sendFeedback: builder.mutation<void, SendFeedbackRequest>({
      query: (body) => ({ url: 'feedback', method: 'POST', body }),
    }),
  }),
});

export const { useSendFeedbackMutation } = feedbackApi;
