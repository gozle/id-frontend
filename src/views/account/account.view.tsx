import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { UserCard } from '@components/account';
import {
  HorizontalScrollContainer,
  SlideDialog,
  TileItem,
  TitledBlock,
} from '@components/common';
import {
  ProfileFormContainer,
  SettingsFormContainer,
} from '@containers/account';
import { getAccountRoutePath } from '@lib/helpers';
import { Tile } from '@lib/types';
import { useAppSelector } from '@modules/store/store.hooks';

import {
  AccountDialogType,
  accountViewTileItems,
  dialogTitleMap,
} from './account.constants';

const Root = styled(Box)({
  height: '100%',
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
});

const MyTitledBlock = styled(TitledBlock)(({ theme }) => ({
  margin: `${theme.spacing(1)} 0 0`,
}));

const MyTileItem = styled(TileItem, {
  shouldForwardProp: (prop) => prop !== 'i',
})<Tile & { i: number }>(({ i, theme }) => ({
  marginLeft: i > 0 ? theme.spacing(1) : 0,
}));

const AccountView = () => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState<AccountDialogType | null>(null);

  const { user } = useAppSelector((s) => s.auth);
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleDialogClose = () => navigate(getAccountRoutePath());

  useEffect(() => {
    if (
      params.dialog &&
      Object.values(AccountDialogType).includes(
        params.dialog as AccountDialogType,
      )
    ) {
      setDialog(params.dialog as AccountDialogType);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [params]);

  return (
    <>
      <Head>
        <title>{t('account_page_title')}</title>
      </Head>
      <Root>
        {user && (
          <>
            <UserCard data={user} />
            {accountViewTileItems.map((el) => (
              <MyTitledBlock key={el.title} title={t(el.title)}>
                <HorizontalScrollContainer>
                  {el.items.map((item, i) => (
                    <MyTileItem {...item} i={i} key={i} />
                  ))}
                </HorizontalScrollContainer>
              </MyTitledBlock>
            ))}
          </>
        )}
      </Root>
      <SlideDialog
        open={open}
        onClose={handleDialogClose}
        title={dialog ? t(dialogTitleMap[dialog]) : ''}
      >
        {dialog === AccountDialogType.YOUR_DATA ? (
          <ProfileFormContainer onAfterSubmit={handleDialogClose} />
        ) : dialog === AccountDialogType.SETTINGS ? (
          <SettingsFormContainer onAfterSubmit={handleDialogClose} />
        ) : (
          <></>
        )}
      </SlideDialog>
    </>
  );
};

export default AccountView;
