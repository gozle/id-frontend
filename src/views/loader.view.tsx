import { CircularProgress } from '@mui/material';
import React from 'react';

import { EmptyScreenLayout } from '@layouts/empty-screen.layout';

export const LoaderView = () => (
  <EmptyScreenLayout>
    <CircularProgress />
  </EmptyScreenLayout>
);
