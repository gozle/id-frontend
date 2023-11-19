import { FormControl, FormControlProps, FormHelperText } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleButtons } from '@components/base/buttons';
import { useGetLanguagesQuery } from '@services/language';

interface P {
  disabled?: boolean;
  error?: boolean;
  formControlType: Pick<FormControlProps, 'fullWidth' | 'size' | 'variant'>;
  helperText?: string;
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    value: number | null,
  ) => void;
  value: number | null;
}

export const LanguageToggleButtons = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { t } = useTranslation();

    const { data: languages } = useGetLanguagesQuery();

    const buttons = languages?.map((el) => ({ name: el.name, value: el.id }));

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
          {t('select_system_language')}
        </FormHelperText>
      </FormControl>
    ) : (
      <></>
    );
  },
);

LanguageToggleButtons.displayName = 'LanguageToggleButtons';
