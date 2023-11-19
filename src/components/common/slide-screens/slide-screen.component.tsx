import { Box, BoxProps, styled, SxProps } from '@mui/material';
import React, { memo } from 'react';

const Screen = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'transitionDuration',
})<BoxProps & { transitionDuration: number }>(
  ({ theme, transitionDuration }) => ({
    minWidth: '100%',
    transition: `margin ${transitionDuration}ms ease-in`,
    padding: `0 ${theme.spacing(1)}`,
  }),
);

interface P {
  animationDuration?: number;
  children: React.ReactNode | React.ReactNode[];
  sx?: SxProps;
}

export const SlideScreen = memo(
  ({ animationDuration = 200, children, sx }: P) => (
    <Screen sx={sx} transitionDuration={animationDuration}>
      {children}
    </Screen>
  ),
);

SlideScreen.displayName = 'SlideScreen';
