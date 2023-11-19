import React from 'react';

import { LoginHistoryList } from '@components/security';
import { useGetLoginHistoryQuery } from '@services/auth';

export const ActivityContainer = () => {
  const { data } = useGetLoginHistoryQuery();

  return data ? <LoginHistoryList data={data} /> : <></>;
};
