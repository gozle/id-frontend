import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmptyScreenLayout } from '@layouts/empty-screen.layout';
import { RoutePaths } from '@lib/enums';
import { logout } from '@modules/store/features/auth';
import { useAppDispatch } from '@modules/store/store.hooks';

const LogoutView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());

    navigate(RoutePaths.HOME);
  }, [dispatch, navigate]);

  return <EmptyScreenLayout></EmptyScreenLayout>;
};

export default LogoutView;
