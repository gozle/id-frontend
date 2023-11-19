import { Button, ButtonProps, styled } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { HorizontalScrollContainer } from '@components/common';
import { menuItems } from '@lib/menu-items';

const MyButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<ButtonProps & { isActive: boolean }>(({ theme, isActive }) => ({
  backgroundColor: isActive
    ? theme.palette.primary.main
    : theme.palette.action.disabledBackground,
  color: isActive ? '#fff' : theme.palette.text.primary,
  fontSize: '12px',
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  borderRadius: theme.spacing(0.5),
  whiteSpace: 'nowrap',
  margin: `${theme.spacing(0.5)} 0`,
}));

export const AccountMenuButtons = () => {
  const { t } = useTranslation();

  return (
    <HorizontalScrollContainer>
      {menuItems.map((el) => (
        <NavLink
          key={el.name}
          to={el.to}
          style={{ margin: '0 0.25em', textDecoration: 'none' }}
        >
          {({ isActive }) => (
            <MyButton isActive={isActive}>{t(el.name)}</MyButton>
          )}
        </NavLink>
      ))}
    </HorizontalScrollContainer>
  );
};
