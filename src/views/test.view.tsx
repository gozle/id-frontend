import { Box } from '@mui/material';
import React from 'react';

import { GenderForm } from '@components/auth';
import { EmptyScreenLayout } from '@layouts/empty-screen.layout';

export const TestView = () => {
  const handleSubmit = (data: unknown) => console.log(data);

  return (
    <EmptyScreenLayout>
      <Box sx={{ maxHeight: '200px' }}>
        <GenderForm loading={false} onSubmit={handleSubmit} />
      </Box>
    </EmptyScreenLayout>
  );
};
