import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography, Button, styled } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LoginHistoryItem } from '@lib/types';
import { tunedDayjs } from '@modules/dayjs';

const MyButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

interface P {
  data: LoginHistoryItem;
  onCloseClick: React.MouseEventHandler;
  onNotMeClick: React.MouseEventHandler;
}

export const LoginHistoryDetailed = ({
  data,
  onCloseClick,
  onNotMeClick,
}: P) => {
  const { t, i18n } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          height: '125px',
          width: '100%',
          backgroundColor: (t) => t.palette.grey[800],
          borderRadius: (t) => t.spacing(1),
        }}
      />
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {t('account_login')}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {tunedDayjs(data.createdAt).locale(i18n.language).format('LLL')}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        IP {data.ip}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {data.browser} - {data.device}
      </Typography>
      <MyButton fullWidth onClick={onCloseClick}>
        {t('close')}
      </MyButton>
      <Button
        variant="text"
        color="error"
        onClick={onNotMeClick}
        startIcon={<ErrorOutlineIcon />}
        sx={{
          fontSize: '12px',
          textTransform: 'none',
          alignSelf: 'center',
          mt: 1,
        }}
      >
        {t('its_not_me')}
      </Button>
    </Box>
  );
};
