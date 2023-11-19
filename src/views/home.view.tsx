import { Container, styled } from '@mui/material';
import React from 'react';

import { Welcome } from '@components/home';
import { ServicesLayout } from '@layouts/services';

const Root = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

const HomeView = () => (
  <ServicesLayout>
    <Root>
      <Welcome />
    </Root>
  </ServicesLayout>
);

export default HomeView;
