import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const CancelButton = (props: ButtonProps) => {
  const { t } = useTranslation();

  return <Button {...props}>{t('cancel')}</Button>;
};
