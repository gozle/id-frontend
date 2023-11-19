import { styled } from '@mui/material';
import React, { useState } from 'react';

import { SlideScreensContainer } from '@components/common';
import { GiftCardForm } from '@components/pay';
import { PayErrorType } from '@lib/enums';
import { useApplyGiftCardMutation } from '@services/pay';

import { PayErrorContainer } from './pay-error.container';
import { PaySuccessContainer } from './pay-success.container';

const MyGiftCardForm = styled(GiftCardForm)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

interface P {
  onAfterSubmit: () => void;
}

export const GiftCardFormContainer = ({ onAfterSubmit }: P) => {
  const [applyGiftCard, { data, error, isLoading }] =
    useApplyGiftCardMutation();
  const [screen, setScreen] = useState(0);

  const handleSubmit = async (body: { code: string }) => {
    await applyGiftCard(body);

    setScreen(1);
  };

  return (
    <SlideScreensContainer
      screen={screen}
      screenContent={[
        <MyGiftCardForm
          key="form"
          error={error}
          loading={isLoading}
          onSubmit={handleSubmit}
        />,
        error ? (
          <PayErrorContainer
            key="error"
            onClick={onAfterSubmit}
            type={PayErrorType.INVALID_GIFT_CARD}
          />
        ) : (
          <PaySuccessContainer
            key="success"
            onClick={onAfterSubmit}
            value={data?.amount || 0}
          />
        ),
      ]}
      screenSx={{ height: '100%' }}
    />
  );
};
