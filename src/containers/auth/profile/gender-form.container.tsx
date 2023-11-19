import React from 'react';

import { GenderForm } from '@components/auth';
import { Gender } from '@lib/enums';
import { useUpdateUserMutation } from '@services/user';

interface P {
  onAfterSubmit?: () => void;
}

export const GenderFormContainer = ({ onAfterSubmit }: P) => {
  const [updateUser, { error, isLoading, reset }] = useUpdateUserMutation();

  const handleSubmit = async (body: { gender: Gender }) => {
    await updateUser(body);

    onAfterSubmit?.();
  };

  return (
    <GenderForm
      error={error}
      loading={isLoading}
      onSubmit={handleSubmit}
      reset={reset}
    />
  );
};
