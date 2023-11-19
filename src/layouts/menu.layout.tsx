import { Box, Container, styled } from '@mui/material';
import React from 'react';

import { AccountMenuButtons, AccountMenuList } from '@components/common';
import { useWindowSize } from '@lib/hooks';

interface P {
  children?: React.ReactNode;
}

const Root = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  backgroundColor: theme.palette.mode === 'light' ? '#f6f6f6' : '#303030',

  width: '100%',
  height: '100%',

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(8),
  },
}));

const MyContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',

  height: '100%',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const widthStep = 100;

const widthSelector = (width: number) =>
  width ? Math.floor(width / widthStep) * widthStep : 1;

export const MenuLayout = ({ children }: P) => {
  const { width } = useWindowSize({ widthSelector });

  return (
    <Root>
      <MyContainer>
        {width >= 900 ? (
          <Box sx={{ flexShrink: 0, mr: 10 }}>
            <AccountMenuList />
          </Box>
        ) : (
          <Box sx={{ flexShrink: 0, mb: 1 }}>
            <AccountMenuButtons />
          </Box>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          {children}
        </Box>
      </MyContainer>
    </Root>
  );
};
