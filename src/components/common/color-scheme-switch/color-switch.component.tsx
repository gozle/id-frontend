import { Box, styled, useTheme } from '@mui/material';
import React from 'react';

import { DarkThemeIcon } from '@icons/dark-theme.icon';
import { LightThemeIcon } from '@icons/light-theme.icon';

const Root = styled(Box)(({ theme }) => {
  const borderColor =
    theme.palette.mode === 'light'
      ? 'rgba(0, 0, 0, 0.23)'
      : 'rgba(255, 255, 255, 0.23)';

  return {
    position: 'relative',

    fontSize: '20px',

    height: '2em',
    width: '2em',
    padding: '20%',

    borderWidth: 1,
    borderRadius: '0.5em',
    borderStyle: 'solid',
    borderColor,

    ['&:hover']: {
      borderColor: theme.palette.text.primary,
    },
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      ['&:hover']: {
        borderColor,
      },
    },

    ['& > svg']: {
      fill: 'currentColor',
    },
  };
});

const Checkbox = styled('input')`
  opacity: 0;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  margin: 0;

  cursor: pointer;
`;

interface P {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorSwitch = ({ checked, onChange }: P) => {
  const theme = useTheme();

  return (
    <Root
      sx={{
        borderColor:
          theme.palette.mode === 'light'
            ? 'rgba(0, 0, 0, 0.23)'
            : 'rgba(255, 255, 255, 0.23)',
      }}
    >
      <Checkbox type="checkbox" checked={checked} onChange={onChange} />
      {checked ? <LightThemeIcon /> : <DarkThemeIcon />}
    </Root>
  );
};
