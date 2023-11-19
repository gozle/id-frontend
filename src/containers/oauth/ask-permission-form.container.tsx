import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AvatarMainInfo } from '@components/account';
import { useAppSelector } from '@modules/store/store.hooks';
import {
  GetOAuthTokenResponse,
  useGetClientQuery,
  useLazyGetOAuthTokenQuery,
} from '@services/oauth';

const MyAvatarMainInfo = styled(AvatarMainInfo)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

interface P {
  clientId: string;
  onAfterSubmit?: (res: GetOAuthTokenResponse) => void;
}

export const AskPermissionFormContainer = ({ clientId, onAfterSubmit }: P) => {
  const { t } = useTranslation();
  const { isAuth, user } = useAppSelector((s) => s.auth);

  const { data: client } = useGetClientQuery(
    { client_id: clientId },
    { skip: !isAuth },
  );
  const [getToken] = useLazyGetOAuthTokenQuery();

  const handleAllowClick = async () => {
    const res = await getToken();

    if (res.data && onAfterSubmit) onAfterSubmit(res.data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {user && <MyAvatarMainInfo data={user} />}
      {client && (
        <Typography variant="body1" sx={{ textAlign: 'center', mb: 4 }}>
          {t('oauth_alert_text', { name: client.name })}
        </Typography>
      )}
      <Button onClick={handleAllowClick}>{t('allow')}</Button>
    </Box>
  );
};
