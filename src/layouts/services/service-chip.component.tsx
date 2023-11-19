import { Box, BoxProps, styled } from '@mui/material';
import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { Service } from './service.constants';

const Root = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'background' && prop !== 'color',
})<LinkProps & BoxProps & { background: string; color?: string }>(
  ({ theme, background, color }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(10),
    height: theme.spacing(10),
    background,
    animation: 'animate 25s linear infinite',
    bottom: '-150px',
    borderRadius: '18%',

    color: color || '#fff',

    ['& > svg']: {
      width: '50%',
      height: '50%',
    },
  }),
);

interface P extends Service {
  className?: string;
}

export const ServiceChip = ({ className, Icon, background, color, to }: P) => (
  <Root
    className={className}
    background={background}
    color={color}
    component={Link}
    to={to}
  >
    <Icon />
  </Root>
);
