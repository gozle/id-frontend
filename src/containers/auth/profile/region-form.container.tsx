import React from 'react';

import { RegionForm } from '@components/auth';
import { UpdateUserRequest, useUpdateUserMutation } from '@services/user';

interface P {
  onAfterSubmit?: () => void;
}

export const RegionFormContainer = ({ onAfterSubmit }: P) => {
  const [updateUser, { error, isLoading, reset }] = useUpdateUserMutation();

  const handleSubmit = async (body: { cityId: number; regionId: number }) => {
    const data: UpdateUserRequest = {};

    data.city = body.cityId;
    data.region = body.regionId;

    await updateUser(data);

    onAfterSubmit?.();
  };

  return (
    <RegionForm
      error={error}
      loading={isLoading}
      onSubmit={handleSubmit}
      reset={reset}
    />
  );
};
