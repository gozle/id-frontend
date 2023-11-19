import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RoutePaths } from '@lib/enums';

interface P {
  onOkClick: React.MouseEventHandler;
}

export const ItsNotMeWarning = ({ onOkClick }: P) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <img src="/protection-danger 1.png" />
      <Typography sx={{ fontWeight: 700 }} variant="h6">
        {t('its_not_me_title')}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {t('its_not_me_description')}
      </Typography>
      <Link
        to={RoutePaths.SECURITY}
        style={{ width: '100%', marginTop: '30px' }}
      >
        <Button fullWidth>{t('change_password')}</Button>
      </Link>
      <Button
        variant="text"
        color="info"
        onClick={onOkClick}
        sx={{
          fontSize: '12px',
          textTransform: 'none',
          alignSelf: 'center',
          mt: 1,
        }}
      >
        {t('everything_is_ok')}
      </Button>
    </Box>
  );
};
