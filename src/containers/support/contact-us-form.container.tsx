import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ContactUsForm, ContactUsFormSchema } from '@components/support';
import { useAppSelector } from '@modules/store/store.hooks';
import {
  SendFeedbackRequest,
  useSendFeedbackMutation,
} from '@services/feedback';

interface P {
  className?: string;
  onAfterSubmit?: () => void;
}

export const ContactUsFormContainer = ({ className, onAfterSubmit }: P) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();
  const user = useAppSelector((s) => s.auth.user);

  const [sendFeedback, { error, isLoading, reset, isSuccess }] =
    useSendFeedbackMutation();

  const handleSubmit = async (body: ContactUsFormSchema) => {
    if (user) {
      const data: SendFeedbackRequest = {
        email: user.email || undefined,
        name: `${user.lastName} ${user.firstName}`,
        text: body.text,
      };

      await sendFeedback(data);

      setOpen(true);

      if (isSuccess) onAfterSubmit?.();
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <>
      <ContactUsForm
        className={className}
        error={error}
        loading={isLoading}
        onSubmit={handleSubmit}
        reset={reset}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {isSuccess ? t('contact_us_success') : t('smth_went_wrong')}
        </Alert>
      </Snackbar>
    </>
  );
};
