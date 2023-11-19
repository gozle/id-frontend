import { Box, styled } from '@mui/material';
import React from 'react';

import { ServiceChip } from './service-chip.component';
import { Service, services } from './service.constants';

const Container = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.mode === 'light' ? '#f6f6f6' : '#303030',

  ['@keyframes animate']: {
    ['0%']: {
      transform: 'translateY(0) rotate(0deg)',
      opacity: 1,
    },

    ['100%']: {
      transform: 'translateY(-1000px) rotate(720deg)',
      opacity: 0,
    },
  },
}));

const MyServiceChip = styled(ServiceChip, {
  shouldForwardProp: (prop) => prop !== 'i',
})<Service & { i: number }>(({ i }) => {
  switch (i % 11) {
    case 0:
      return {
        left: '5%',
        // width: theme.spacing(10),
        // height: theme.spacing(10),
        animationDelay: '0s',
      };
    case 1:
      return { left: '10%', animationDelay: '2s', animationDuration: '12s' };
    case 2:
      return { right: '5%', animationDelay: '4s', animationDuration: '12s' };
    case 3:
      return { right: '10%', animationDelay: '0s', animationDuration: '18s' };
    case 4:
      return { left: '15%', animationDelay: '0s' };
    case 5:
      return { right: '15%', animationDelay: '3s' };
    case 6:
      return { left: '20%', animationDelay: '7s' };
    case 7:
      return { right: '20%', animationDelay: '15s', animationDuration: '45s' };
    case 8:
      return { left: '10%', animationDelay: '2s', animationDuration: '35s' };
    case 9:
      return { right: '10%', animationDelay: '0s', animationDuration: '11s' };
    case 10:
      return { right: '5%', animationDelay: '10s', animationDuration: '14s' };
  }

  return {};
});

interface P {
  children?: React.ReactNode;
}

export const ServicesLayout = ({ children }: P) => (
  <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
    <Container>
      {services.map((el, i) => (
        <MyServiceChip key={i} i={i} {...el} />
      ))}
    </Container>
    <Box
      sx={{
        zIndex: 1,

        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,

        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  </Box>
);
