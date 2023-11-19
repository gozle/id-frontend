import { Container, styled } from '@mui/material';
import React from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { AuthFormContainer } from '@containers/auth';
import { ServicesLayout } from '@layouts/services';

const Root = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

const AuthView = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('auth_page_title')}</title>
      </Head>

      <ServicesLayout>
        <Root>
          <AuthFormContainer />
        </Root>
      </ServicesLayout>
    </>
  );
};

export default AuthView;
