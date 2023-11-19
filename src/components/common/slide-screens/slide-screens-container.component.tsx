import { Box, styled, SxProps } from '@mui/material';
import React from 'react';

import { SlideScreen } from './slide-screen.component';

const ScreenContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  overflow: 'hidden',

  padding: `${theme.spacing(1)} 0`,

  height: '100%',
}));

interface P {
  animationDuration?: number;
  screen: number;
  screenContent: React.ReactNode[];
  screenSx?: SxProps;
}

export const SlideScreensContainer = ({
  animationDuration,
  screen,
  screenContent,
  screenSx,
}: P) => (
  <ScreenContainer>
    {screenContent.map((el, i) => (
      <SlideScreen
        animationDuration={animationDuration}
        key={i}
        sx={i > 0 ? screenSx : { ...screenSx, ml: `-${100 * screen}%` }}
      >
        {el}
      </SlideScreen>
    ))}
  </ScreenContainer>
);
