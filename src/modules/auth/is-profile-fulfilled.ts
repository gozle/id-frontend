import { createSelector } from '@reduxjs/toolkit';

import { User, UserProfile } from '@lib/types';
import { AppState } from '@modules/store';

export const isProfileFullfiled = (user: UserProfile): boolean =>
  Boolean(
    user.firstName &&
      user.lastName &&
      user.language &&
      user.gender &&
      user.region &&
      user.city,
  );

const userSelector = (state: AppState): User | undefined => state.auth.user;

export const userProfileSelector = createSelector(
  userSelector,
  (user?: User): UserProfile | undefined =>
    user
      ? {
          city: user.city,
          firstName: user.firstName,
          gender: user.gender,
          language: user.language,
          lastName: user.lastName,
          region: user.region,
        }
      : undefined,
);
