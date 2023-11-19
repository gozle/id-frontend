import React, { useEffect, useState } from 'react';

import { PhoneForm } from '@components/auth';
import { SlideScreensContainer } from '@components/common';
import { useTimer } from '@lib/hooks';
import {
  useGetReserveNumberQuery,
  useRegisterReserveNumberMutation,
} from '@services/security';

import { ActivateReserveNumberFormContainer } from './activate-reserve-number-form.container';
import { DectivateReserveNumberContainer } from './deactivate-reserve-number.container';

const slideAnimationDuration = 200;

interface P {
  onAfterSubmit?: () => void;
}

export const ReserveNumberFormContainer = ({ onAfterSubmit }: P) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [screen, setScreen] = useState(0);
  const [mountedScreen, setMountedScreen] = useState(0);

  const { time, setTimer, resetTimer } = useTimer();

  const { data: reserveNumber, error, isLoading } = useGetReserveNumberQuery();

  const [
    registerRN,
    { error: registerError, isLoading: registerLoading, reset: registerReset },
  ] = useRegisterReserveNumberMutation();

  const handleRegisterNumberSubmit = async (body: { phone: string }) => {
    setPhoneNumber(body.phone);
    await registerRN({ phoneNumber: body.phone })?.unwrap();
    setTimer(60);
    setScreen(1);
  };

  const handleResendCode = async () => {
    if (phoneNumber) {
      await registerRN({ phoneNumber })?.unwrap();
      setTimer(60);
    }
  };

  const handleAfterActivateReserveNumberSubmit = () => onAfterSubmit?.();

  useEffect(() => {
    if (registerError) resetTimer();
  }, [registerError, resetTimer]);

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

  const screens = isLoading
    ? []
    : !error && reserveNumber && reserveNumber.activatedAt !== null
    ? [
        <DectivateReserveNumberContainer
          key="deactivate"
          onAfterSubmit={onAfterSubmit}
          phoneNumber={reserveNumber?.phoneNumber}
        />,
      ]
    : [
        <PhoneForm
          error={registerError}
          inView={mountedScreen === 0}
          key="register"
          loading={registerLoading}
          onSubmit={handleRegisterNumberSubmit}
          reset={registerReset}
        />,
        <ActivateReserveNumberFormContainer
          inView={mountedScreen === 1}
          key="activate"
          onAfterSubmit={handleAfterActivateReserveNumberSubmit}
          onResendCode={handleResendCode}
          phoneNumber={phoneNumber}
          time={time}
        />,
      ];

  return (
    <SlideScreensContainer
      animationDuration={slideAnimationDuration}
      screen={screen}
      screenContent={screens}
      screenSx={{ height: '100%' }}
    />
  );
};
