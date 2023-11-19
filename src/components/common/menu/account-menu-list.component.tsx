import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SxProps,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { menuItems } from '@lib/menu-items';

const ListItemButtonProps = (isActive: boolean): { sx: SxProps } => ({
  sx: {
    minWidth: 0,
    justifyContent: 'center',
    backgroundColor: isActive ? 'primary.main' : undefined,
    color: isActive ? '#ffffff' : undefined,
    borderRadius: 2,

    ['&:hover']: {
      backgroundColor: isActive ? 'primary.main' : undefined,
    },
  },
});

const listItemIconBoxSx = { height: '25px', width: '25px', mr: 2 };

export const AccountMenuList = () => {
  const { t } = useTranslation();

  return (
    <List sx={{ p: 0 }}>
      {menuItems.map(({ Icon, name, to }, i) => (
        <ListItem
          key={name}
          disablePadding
          sx={{ display: 'block', mt: i > 0 ? 1 : 0 }}
        >
          <NavLink
            to={to}
            style={{ textDecoration: 'none', color: 'currentcolor' }}
          >
            {({ isActive }) => (
              <ListItemButton {...ListItemButtonProps(isActive)}>
                <Box sx={listItemIconBoxSx}>
                  <Icon />
                </Box>
                <ListItemText
                  primary={t(name)}
                  primaryTypographyProps={{ sx: { fontWeight: 700 } }}
                />
              </ListItemButton>
            )}
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};
