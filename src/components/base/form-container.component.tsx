import { Grid, Typography } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import React, { ReactNode, useEffect } from 'react';

import { httpErrorSerializer } from '@lib/helpers';
import { HttpError } from '@lib/types';

import { CancelButton, SaveButton } from '../base/buttons';

type Props = {
  buttons?: React.ReactNode;
  children: ReactNode;
  className?: string;
  error?: FetchBaseQueryError | SerializedError;
  hasError: boolean;
  loading: boolean;
  onCancel?: () => void;
  onSubmit: (event: React.FormEvent) => void;
  reset?: () => void;
  title?: string;
};

export const FormContainer = ({
  buttons,
  children,
  className,
  error,
  hasError,
  loading,
  onCancel,
  onSubmit,
  reset,
  title,
}: Props) => {
  useEffect(() => {
    if (error && reset) {
      const timeout = setTimeout(() => reset(), 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error, reset]);

  return (
    <form
      className={className}
      onSubmit={onSubmit}
      style={{ height: '100%', width: '100%' }}
    >
      <Grid container direction="column" spacing={2} sx={{ minHeight: '100%' }}>
        {title && (
          <Grid item>
            <Typography variant="h6">{title}</Typography>
          </Grid>
        )}
        {children}
        {error && (
          <Grid item sx={{ flexGrow: 0 }}>
            <Typography
              color="error"
              sx={{ whiteSpace: 'pre-wrap' }}
              variant="body2"
            >
              {'data' in error
                ? httpErrorSerializer(error.data as HttpError)
                : JSON.stringify(error)}
            </Typography>
          </Grid>
        )}
        <Grid item sx={{ mt: 'auto' }}>
          {buttons || (
            <>
              <SaveButton
                type="submit"
                disabled={loading || hasError}
                sx={onCancel ? { mr: 1 } : undefined}
              />

              {onCancel && (
                <CancelButton onClick={onCancel} disabled={loading} />
              )}
            </>
          )}
        </Grid>
      </Grid>
    </form>
  );
};
