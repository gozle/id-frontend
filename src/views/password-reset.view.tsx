import { Container, styled } from '@mui/material';
import React from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { PasswordResetFormContainer } from '@containers/auth';
import { ServicesLayout } from '@layouts/services';

const Root = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

const PasswordResetView = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t('password_reset_page_title')}</title>
      </Head>

      <ServicesLayout>
        <Root>
          <PasswordResetFormContainer />
        </Root>
      </ServicesLayout>
    </>
  );
};

export default PasswordResetView;
