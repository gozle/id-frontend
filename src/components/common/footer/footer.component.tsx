import { Box, styled, SxProps, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { footerItems } from './footer.constants';

type P = {
  className?: string;
  sx?: SxProps;
};

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  fontSize: '14px',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

const List = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',

  width: '100%',
  padding: 0,

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const ListItem = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'currentColor',
  fontWeight: 700,
  padding: `${theme.spacing(0.5)} 0`,
  textAlign: 'center',

  [theme.breakpoints.up('md')]: {
    padding: 0,
    marginRight: theme.spacing(4),
    textAlign: 'left',

    ['&:hover']: {
      textDecoration: 'underline',
    },
  },
}));

const Rights = styled(Typography)(({ theme }) => ({
  fontWeight: '700',
  fontSize: '1em',
  textAlign: 'center',
  margin: `${theme.spacing(1)} 0`,
  whiteSpace: 'nowrap',

  [theme.breakpoints.up('md')]: {
    margin: `0 ${theme.spacing(2)} 0 auto`,
  },
}));

export const Footer = ({ className, sx }: P) => {
  const { t } = useTranslation();

  return (
    <Root className={className} component="footer" sx={sx}>
      <List>
        {footerItems.map((el) => (
          <ListItem key={el.title} to={el.to}>
            {t(el.title)}
          </ListItem>
        ))}
      </List>
      <Rights>{t('all_rights_reserved')}</Rights>
    </Root>
  );
};
