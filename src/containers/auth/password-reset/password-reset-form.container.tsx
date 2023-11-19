import { Paper, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Logo, SlideScreensContainer } from '@components/common';

import { PasswordResetCodeFormContainer } from './password-reset-code-form.container';
import { PasswordResetRegisterFormContainer } from './password-reset-register-form.container';
import { PasswordResetSaveFormContainer } from './password-reset-save-form.container';

export type PasswordResetFormState = {
  code?: string;
  email?: string;
};

const Root = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  maxWidth: theme.spacing(80),
  width: '100%',

  padding: `${theme.spacing(6)} ${theme.spacing(2)}`,

  [theme.breakpoints.up('md')]: {
    padding: `${theme.spacing(6)} ${theme.spacing(12)}`,
  },
}));

const slideAnimationDuration = 200;

export const PasswordResetFormContainer = () => {
  const [state, setState] = useState<PasswordResetFormState>({});
  const [screen, setScreen] = useState(0);
  const [mountedScreen, setMountedScreen] = useState(0);

  const handleRegisterSubmit = async (body: { email: string }) => {
    setState((prev) => ({ ...prev, ...body }));
    setScreen(1);
  };

  const handleCodeSubmit = async (body: { code: string }) => {
    setState((prev) => ({ ...prev, ...body }));
    setScreen(2);
  };

  const handleSaveSubmit = () => setScreen(3);

  useEffect(() => {
    if (mountedScreen !== screen) {
      const timeout = setTimeout(
        () => setMountedScreen(screen),
        slideAnimationDuration,
      );

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [mountedScreen, screen]);

  const screens = [
    <PasswordResetRegisterFormContainer
      key="register"
      inView={mountedScreen === 0}
      onAfterSubmit={handleRegisterSubmit}
    />,
    <PasswordResetCodeFormContainer
      key="code"
      inView={mountedScreen === 1}
      onAfterSubmit={handleCodeSubmit}
    />,
    <PasswordResetSaveFormContainer
      key="save"
      inView={mountedScreen === 2}
      onAfterSubmit={handleSaveSubmit}
      state={state}
    />,
  ];

  return (
    <Root>
      <Logo sx={{ height: (t) => t.spacing(5), mb: 2 }} />
      <SlideScreensContainer
        animationDuration={slideAnimationDuration}
        screen={screen}
        screenContent={screens}
      />
    </Root>
  );
};
