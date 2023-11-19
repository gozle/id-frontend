import { Paper, styled } from '@mui/material';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { SlideScreensContainer } from '@components/common';
import { API_URL } from '@lib/constants';
import { useAppSelector } from '@modules/store/store.hooks';
import { GetOAuthTokenResponse, OAuthV2Request } from '@services/oauth';

import { AskPermissionFormContainer } from './ask-permission-form.container';
import { RedirectToContainer } from './redirect-to.container';

const Root = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  maxWidth: theme.spacing(80),
  width: '100%',

  padding: `${theme.spacing(6)} ${theme.spacing(2)}`,

  [theme.breakpoints.up('md')]: {
    padding: `${theme.spacing(6)} ${theme.spacing(12)}`,
  },
}));

export const OAuthFormContainer = () => {
  const [screen, setScreen] = useState(0);

  const params = useLoaderData() as OAuthV2Request;
  const { user } = useAppSelector((s) => s.auth);

  const handleOnAfterAllowSubmit = (data: GetOAuthTokenResponse) => {
    setScreen(1);

    window.location.replace(
      `${API_URL}/login?${new URLSearchParams(params).toString()}&token=${
        data.token
      }`,
    );
  };

  return user ? (
    <Root>
      {/* <Logo sx={{ height: (t) => t.spacing(5), mb: 2 }} /> */}
      <SlideScreensContainer
        screen={screen}
        screenContent={[
          <AskPermissionFormContainer
            clientId={params.client_id}
            key="ask-permission"
            onAfterSubmit={handleOnAfterAllowSubmit}
          />,
          <RedirectToContainer
            key="redirect"
            redirectUrl={params.redirect_uri}
          />,
        ]}
      />
    </Root>
  ) : (
    <></>
  );
};
