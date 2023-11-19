import { Box, Divider, RadioGroup, styled } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import {
  HorizontalScrollContainer,
  SlideDialog,
  TileItem,
  TitledBlock,
} from '@components/common';
import { LoginMethodRadio } from '@components/security';
import {
  ActivityContainer,
  RemovePasswordFormContainer,
  ReserveNumberFormContainer,
  SetPasswordFormContainer,
} from '@containers/security';
import { LoginMethodType } from '@lib/enums';
import { getSecurityRoutePath } from '@lib/helpers';
import { Tile } from '@lib/types';
import { useAppSelector } from '@modules/store/store.hooks';
import { useCheck2faQuery } from '@services/auth';

import {
  SecurityDialogType,
  securityViewTileItems,
  dialogTitleMap,
  loginMethods,
  loginMethodsMap,
} from './security.constants';

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

const SecurityView = () => {
  const [open, setOpen] = useState(false);
  const [loginMethod, setLoginMethod] = useState<LoginMethodType>(
    LoginMethodType.DEFAULT,
  );
  const [dialog, setDialog] = useState<SecurityDialogType | null>(null);

  const { user } = useAppSelector((s) => s.auth);
  const params = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: tfa, isLoading } = useCheck2faQuery();

  const handleDialogClose = () => navigate(getSecurityRoutePath());

  const handleLoginMethodChange = useCallback((_: unknown, value: string) => {
    const item = loginMethods.find((el) => el.id === value);

    if (item) {
      if (item.dialog) {
        setDialog(item.dialog);
        setOpen(true);
      } else {
      }
    }
  }, []);

  useEffect(() => {
    if (tfa && loginMethodsMap[tfa['2fa']])
      setLoginMethod(loginMethodsMap[tfa['2fa']]);
  }, [tfa]);

  useEffect(() => {
    if (
      params.dialog &&
      Object.values(SecurityDialogType).includes(
        params.dialog as SecurityDialogType,
      )
    ) {
      setDialog(params.dialog as SecurityDialogType);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [params]);

  return (
    <>
      <Head>
        <title>{t('security_page_title')}</title>
      </Head>
      <Root>
        <MyTitledBlock title={t('login_methods')}>
          <RadioGroup
            name="login-methods-group"
            onChange={handleLoginMethodChange}
            value={loginMethod}
          >
            {loginMethods.map((item, i) => (
              <React.Fragment key={item.id}>
                {i > 0 && <Divider sx={{ my: 1 }} variant="middle" />}
                <LoginMethodRadio
                  Icon={item.Icon}
                  description={item.description}
                  disabled={isLoading}
                  id={item.id}
                  title={item.title}
                />
              </React.Fragment>
            ))}
          </RadioGroup>
        </MyTitledBlock>
        {user && (
          <>
            {securityViewTileItems.map((el) => (
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
        {dialog === SecurityDialogType.SET_PASSWORD ? (
          <SetPasswordFormContainer onAfterSubmit={handleDialogClose} />
        ) : dialog === SecurityDialogType.REMOVE_PASSWORD ? (
          <RemovePasswordFormContainer onAfterSubmit={handleDialogClose} />
        ) : dialog === SecurityDialogType.ACTIVITY ? (
          <ActivityContainer />
        ) : dialog === SecurityDialogType.RESERVE_NUMBER ? (
          <ReserveNumberFormContainer onAfterSubmit={handleDialogClose} />
        ) : (
          <></>
        )}
      </SlideDialog>
    </>
  );
};

export default SecurityView;
