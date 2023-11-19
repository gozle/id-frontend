import { HttpError } from '@lib/types';

export const httpErrorSerializer = (data: HttpError) =>
  Array.isArray(data.message) ? data.message.join('\n') : data.message;
