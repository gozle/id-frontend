import {
  Box,
  FormControlLabel,
  Radio,
  styled,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LoginMethod } from '@lib/types';

const IconRoot = styled(Box)(({ theme }) => ({
  height: theme.spacing(6),
  width: theme.spacing(6),
  minWidth: 0,
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  background:
    theme.palette.mode === 'light'
      ? 'rgba(180, 184, 204, 0.14)'
      : 'rgba(180, 184, 204, 0.14)',
  flexShrink: 0,
}));

const LabelRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',

  marginRight: theme.spacing(2),
}));

interface P extends LoginMethod {
  disabled?: boolean;
}

export const LoginMethodRadio = ({
  Icon,
  description,
  disabled,
  id,
  title,
}: P) => {
  const { t } = useTranslation();

  return (
    <FormControlLabel
      disabled={disabled}
      label={
        <LabelRoot>
          <IconRoot>
            <Icon />
          </IconRoot>
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, lineHeight: 1.25, mb: 0.5 }}
            >
              {t(title)}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: '12px', lineHeight: 1.25 }}
            >
              {t(description)}
            </Typography>
          </Box>
        </LabelRoot>
      }
      control={<Radio value={id} sx={{ ml: 'auto' }} />}
      labelPlacement="start"
      sx={{ width: '100%', m: 0 }}
    />
  );
};
