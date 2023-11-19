import React, { useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { getAccountRoutePath } from '@lib/helpers';
import { isProfileFullfiled } from '@modules/auth';
import { useAppSelector } from '@modules/store/store.hooks';

import { AuthFormLoginContainer } from './login';
import { AuthFormProfileContainer } from './profile';

export const AuthFormContainer = () => {
  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get('redirect_uri');

  const { isAuth, user } = useAppSelector((s) => s.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth && user && isProfileFullfiled(user)) {
      navigate(redirectUrl || getAccountRoutePath());
    }
  }, [isAuth, user, redirectUrl, navigate]);

  return isAuth && user ? (
    isProfileFullfiled(user) ? (
      <Navigate replace to={redirectUrl || getAccountRoutePath()} />
    ) : (
      <AuthFormProfileContainer user={user} />
    )
  ) : (
    <AuthFormLoginContainer />
  );
};
