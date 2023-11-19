import { Box, SxProps } from '@mui/material';
import React from 'react';

import { ColorScheme } from '@lib/enums';

import { ColorSwitch } from './color-switch.component';

interface P {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
  value: ColorScheme | null;
}

export const ColorSchemeSwitch = ({ onChange, sx, value }: P) => (
  <Box sx={sx}>
    <ColorSwitch checked={value === ColorScheme.DARK} onChange={onChange} />
  </Box>
);
