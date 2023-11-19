import React from 'react';

import { ProfileForm, ProfileFormSchema } from '@components/account';
import { tunedDayjs } from '@modules/dayjs';
import { useAppSelector } from '@modules/store/store.hooks';
import { UpdateUserRequest, useUpdateUserMutation } from '@services/user';

interface P {
  className?: string;
  onAfterSubmit?: () => void;
}

export const ProfileFormContainer = ({ className, onAfterSubmit }: P) => {
  const user = useAppSelector((s) => s.auth.user);

  const [updateUser, { error, isLoading, reset, isSuccess }] =
    useUpdateUserMutation();

  const handleSubmit = async (body: ProfileFormSchema) => {
    const data: UpdateUserRequest = {
      ...body,
      birthday: tunedDayjs(body.birthday).format('YYYY-MM-DD'),
    };

    await updateUser(data);

    if (isSuccess) onAfterSubmit?.();
  };

  return user ? (
    <ProfileForm
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
