import { Box, Button, styled } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { PhotoIcon } from '@icons/photo.icon';

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

const ImgContainer = styled(Box)(({ theme }) => ({
  borderRadius: '50%',
  width: theme.spacing(12),
  height: theme.spacing(12),
  background: 'lightgray',
  margin: 'auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  marginBottom: theme.spacing(1),
}));

const Input = styled('input')({
  position: 'absolute',
  opacity: 0,
  width: '100%',
  height: '100%',
  cursor: 'pointer',

  ['&::file-selector-button']: {
    cursor: 'pointer',
  },

  ['&::-ms-browse:hover']: {
    cursor: 'pointer',
  },

  ['&::-webkit-file-upload-button']: {
    cursor: 'pointer',
  },
});

const MyButton = styled(Button)(({ theme }) => ({
  background: theme.palette.action.disabledBackground,
  boxShadow: 'none',
  color: theme.palette.text.primary,

  fontSize: '12px',

  textTransform: 'none',
  padding: `${theme.spacing(0.25)} ${theme.spacing(2)}`,

  ['&:active']: {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.text.primary,
  },

  ['&:hover']: {
    background: theme.palette.action.disabledBackground,
    color: theme.palette.text.primary,
  },
}));

type P = {
  className?: string;
  defaultValue?: string;
  onChange: (value: File) => void;
  value: File | null;
};

export const AvatarInput = ({
  className,
  defaultValue,
  onChange,
  value,
}: P) => {
  const { t } = useTranslation();

  return (
    <Root className={className}>
      <ImgContainer>
        {value || defaultValue ? (
          <img
            src={value ? URL.createObjectURL(value) : defaultValue}
            alt="Avatar"
            style={{ height: '100%' }}
          />
        ) : (
          <></>
        )}
      </ImgContainer>
      {(value || defaultValue) && (
        <MyButton
          startIcon={
            <Box sx={{ height: '0.75em', width: '0.75em' }}>
              <PhotoIcon style={{ verticalAlign: 'top' }} />
            </Box>
          }
        >
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                const files = Array.from(e.target.files);

                if (files.length) onChange(files[0]);
              }
            }}
            title=""
          />
          {t('change_photo')}
        </MyButton>
      )}
    </Root>
  );
};
