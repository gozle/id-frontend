import { Box, styled, Typography } from '@mui/material';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Tile } from '@lib/types';

const Root = styled(Link)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  maxWidth: theme.spacing(30),

  textDecoration: 'none',
  background:
    theme.palette.mode === 'light'
      ? 'rgba(180, 184, 204, 0.14)'
      : 'rgba(180, 184, 204, 0.14)',
  color: 'currentColor',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3),

  cursor: 'pointer',
}));

export const TileItem = memo(
  ({ Icon, className, description, title, to }: Tile) => {
    const { t } = useTranslation();

    return (
      <Root className={className} to={to}>
        <Box sx={{ height: (t) => t.spacing(4), mb: 0.5 }}>
          <Icon />
        </Box>
        <Typography
          sx={{ fontWeight: 700, textAlign: 'center', whiteSpace: 'nowrap' }}
          variant="body2"
        >
          {t(title)}
        </Typography>
        {description && (
          <Typography
            sx={{ fontSize: '12px', lineHeight: 1.25, textAlign: 'center' }}
            variant="subtitle2"
          >
            {t(description)}
          </Typography>
        )}
      </Root>
    );
  },
);

TileItem.displayName = 'TileItem';
