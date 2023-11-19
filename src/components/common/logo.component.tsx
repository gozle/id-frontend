import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import { LogoTextIcon } from '@icons/logo-text.icon';
import { LogoIcon } from '@icons/logo.icon';
import { RoutePaths } from '@lib/enums';

interface P {
  short?: boolean;
  sx?: SxProps<Theme>;
  textColor?: string;
}

export const Logo = ({ short, sx, textColor }: P) => (
  <Box
    component={Link}
    to={RoutePaths.HOME}
    sx={{ ...sx, display: 'block', color: 'text.primary' }}
  >
    {short ? <LogoIcon /> : <LogoTextIcon textFill={textColor} />}
  </Box>
);
