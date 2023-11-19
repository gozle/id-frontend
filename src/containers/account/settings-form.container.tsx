import { styled } from '@mui/material';
import React from 'react';

import { SettingsForm, SettingsFormSchema } from '@components/account';
import { useAppSelector } from '@modules/store/store.hooks';
import { UpdateUserRequest, useUpdateUserMutation } from '@services/user';

const MySettingsForm = styled(SettingsForm)(({ theme }) => ({
  paddingTop: `${theme.spacing(1)}`,
}));

interface P {
  className?: string;
  onAfterSubmit?: () => void;
}

export const SettingsFormContainer = ({ className, onAfterSubmit }: P) => {
  const user = useAppSelector((s) => s.auth.user);

  const [updateUser, { error, isLoading, reset }] = useUpdateUserMutation();

  const handleSubmit = async (body: SettingsFormSchema) => {
    const data: UpdateUserRequest = {};

    if (body.cityId) data.city = body.cityId;
    if (body.colorScheme) data.theme = body.colorScheme;
    if (body.languageId) data.language = body.languageId;
    if (body.regionId) data.region = body.regionId;

    await updateUser(data);

    onAfterSubmit?.();
  };

  return user ? (
    <MySettingsForm
      className={className}
      error={error}
      initialData={user}
      loading={isLoading}
      onSubmit={handleSubmit}
      reset={reset}
    />
  ) : (
    <></>
  );
};
