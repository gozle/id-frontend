import { FormControl, FormControlProps, FormHelperText } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleButtons } from '@components/base/buttons';
import { Gender } from '@lib/enums';

interface P {
  disabled?: boolean;
  error?: boolean;
  formControlType: Pick<FormControlProps, 'fullWidth' | 'size' | 'variant'>;
  helperText?: string;
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    value: string | null,
  ) => void;
  value: string | null;
}

export const GenderToggleButtons = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { t } = useTranslation();

    const buttons = Object.values(Gender).map((el) => ({
      name: t(el),
      value: el,
    }));

    return buttons ? (
      <FormControl
        {...props.formControlType}
        disabled={props.disabled}
        error={props.error}
        ref={ref}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <ToggleButtons
          buttons={buttons}
          onChange={props.onChange}
          value={props.value}
        />
        {props.helperText && (
          <FormHelperText sx={{ whiteSpace: 'pre-wrap' }}>
            {props.helperText}
          </FormHelperText>
        )}
        <FormHelperText sx={{ textAlign: 'center' }}>
          {t('select_gender')}
        </FormHelperText>
      </FormControl>
    ) : (
      <></>
    );
  },
);

GenderToggleButtons.displayName = 'GenderToggleButtons';
