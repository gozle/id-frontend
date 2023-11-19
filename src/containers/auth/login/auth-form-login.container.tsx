import { Paper, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Logo, SlideScreensContainer } from '@components/common';
import { useTimer } from '@lib/hooks';
import { setAuthState } from '@modules/store/features/auth';
import { useAppDispatch } from '@modules/store/store.hooks';
import {
  GetToken2faResponse,
  JwtTokens,
  useSendCodeMutation,
  VerifyPhoneResponse,
} from '@services/auth';

import { SendCodeFormContainer } from './send-code-form.container';
import { TwoFactorAuthCheckFormContainer } from './two-factor-auth-check-form.container';
import { VerifyPhoneFormContainer } from './verify-phone-form.container';

export type LoginFormState = {
  '2fa'?: string;
  code?: string;
  phone?: string;
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

export const AuthFormLoginContainer = () => {
  const [state, setState] = useState<LoginFormState>({});
  const [screen, setScreen] = useState(0);
  const [mountedScreen, setMountedScreen] = useState(0);

  const dispatch = useAppDispatch();

  const { time, setTimer } = useTimer();

  const [sendCode] = useSendCodeMutation();

  const handleAfterSendCodeSubmit = async (data: { phone: string }) => {
    setState((prev) => ({ ...prev, ...data }));
    setTimer(60);
    setScreen(1);
  };

  const handleResendCode = async () => {
    if (state.phone) {
      await sendCode({ phoneNumber: state.phone })?.unwrap();
      setTimer(60);
    }
  };

  const login = (res: JwtTokens) =>
    dispatch(
      setAuthState({
        isAuth: true,
        tokens: { accessToken: res.access, refreshToken: res.refresh },
      }),
    );

  const handleAfterVerifyPhoneSubmit = async (res: VerifyPhoneResponse) => {
    if ('2fa' in res) {
      setState((prev) => ({ ...prev, '2fa': res['2fa'] }));
      setScreen(2);
    } else login(res);
  };

  const handleAfter2faCheckSubmit = (res: GetToken2faResponse) => login(res);

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
    <SendCodeFormContainer
      key="send-code"
      onAfterSubmit={handleAfterSendCodeSubmit}
      inView={mountedScreen === 0}
    />,
    <VerifyPhoneFormContainer
      inView={mountedScreen === 1}
      key="verify-phone"
      onAfterSubmit={handleAfterVerifyPhoneSubmit}
      onResendCode={handleResendCode}
      state={state}
      time={time}
    />,
  ];

  if (state['2fa'])
    screens.push(
      <TwoFactorAuthCheckFormContainer
        inView={mountedScreen === 2}
        key="2fa"
        onAfterSubmit={handleAfter2faCheckSubmit}
        state={state}
      />,
    );

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
