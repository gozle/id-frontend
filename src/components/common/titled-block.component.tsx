import { Box, Typography } from '@mui/material';
import React from 'react';

interface P {
  children: React.ReactNode;
  className?: string;
  title: React.ReactNode;
}

export const TitledBlock = ({ children, className, title }: P) => (
  <Box component="section" className={className}>
    <Box component="header">
      <Typography sx={{ fontWeight: 700, mb: 1 }} variant="body1">
        {title}
      </Typography>
    </Box>
    {children}
  </Box>
);
