import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
  SxProps,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LoginHistoryItem } from '@lib/types';
import { tunedDayjs } from '@modules/dayjs';

const MyListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  background:
    theme.palette.mode === 'light'
      ? 'rgba(180, 184, 204, 0.14)'
      : 'rgba(180, 184, 204, 0.14)',
  overflow: 'hidden',
}));

const MyListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
}));

interface P {
  data: LoginHistoryItem;
  onClick: React.MouseEventHandler;
  sx?: SxProps;
}

export const LoginHistoryListItem = ({ data, onClick, sx }: P) => {
  const { t, i18n } = useTranslation();

  return (
    <MyListItem key={data.id} disablePadding sx={sx}>
      <MyListItemButton onClick={onClick} data-id={data.id}>
        <ListItemIcon
          sx={{
            minWidth: 0,
            width: (t) => t.spacing(3),
            height: (t) => t.spacing(3),
            mr: 2,
          }}
        >
          <img
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            src={data.icon}
          />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography sx={{ fontWeight: 700 }}>
              {t('account_login')}
            </Typography>
          }
          secondary={
            <Typography sx={{ fontSize: '12px' }}>
              {tunedDayjs(data.createdAt).locale(i18n.language).format('LLL') +
                `, ${data.os} - ${data.device}`}
            </Typography>
          }
        />
      </MyListItemButton>
    </MyListItem>
  );
};
