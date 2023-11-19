import React from 'react';

import { LanguageForm } from '@components/auth';
import { UpdateUserRequest, useUpdateUserMutation } from '@services/user';

interface P {
  onAfterSubmit?: () => void;
}

export const LanguageFormContainer = ({ onAfterSubmit }: P) => {
  const [updateUser, { error, isLoading, reset }] = useUpdateUserMutation();

  const handleSubmit = async (body: { languageId: number }) => {
    const data: UpdateUserRequest = {};

    data.language = body.languageId;

    await updateUser(data);

    onAfterSubmit?.();
  };

  return (
    <LanguageForm
      error={error}
      loading={isLoading}
      onSubmit={handleSubmit}
      reset={reset}
    />
  );
};
