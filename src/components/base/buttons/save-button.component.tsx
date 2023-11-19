import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SaveButton = (props: ButtonProps) => {
  const { t } = useTranslation();

  return <Button {...props}>{t('save')}</Button>;
};
