import { AppBar, Box, styled, Toolbar, Typography } from '@mui/material';
import React from 'react';

import { Footer, Logo } from '@components/common';

interface P {
  children?: React.ReactNode;
  title?: string | null;
}

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  height: '100vh',
  width: '100%',
  paddingTop: theme.spacing(9),
}));

const MyToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    padding: `${theme.spacing(2)} ${theme.spacing(12)}`,
  },
}));

const MyFooter = styled(Footer)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    padding: `${theme.spacing(3)} ${theme.spacing(12)}`,
  },
}));

export const BaseLayout = ({ children, title }: P) => (
  <Root>
    <AppBar
      elevation={0}
      sx={{ background: (theme) => theme.palette.background.paper }}
    >
      <MyToolbar>
        <Logo
          sx={{ height: (t) => t.spacing(5), maxWidth: (t) => t.spacing(10) }}
        />
        <Typography variant="body1">{title}</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          {/* <ColorSchemeSwitchContainer sx={{ mr: 1 }} />
          <LanguageSelectContainer /> */}
        </Box>
      </MyToolbar>
    </AppBar>
    <Box sx={{ width: '100%', flexGrow: 1 }}>{children}</Box>
    <MyFooter />
  </Root>
);
