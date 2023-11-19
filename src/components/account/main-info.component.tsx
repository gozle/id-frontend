import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';

import { User } from '@lib/types';

type P = {
  data: User;
  sx?: SxProps;
};

export const MainInfo = ({ data, sx }: P) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
    <Typography sx={{ fontWeight: 700 }} variant="body1">
      {data.firstName} {data.lastName}
    </Typography>
    <Typography sx={{ color: 'text.secodary' }} variant="body2">
      {data.phoneNumber}
    </Typography>
  </Box>
);
