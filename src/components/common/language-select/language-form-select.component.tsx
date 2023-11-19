import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlProps,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useGetLanguagesQuery } from '@services/language';

interface P {
  disabled?: boolean;
  error?: boolean;
  formControlType: Pick<FormControlProps, 'fullWidth' | 'size' | 'variant'>;
  helperText?: string;
  onChange: (event: SelectChangeEvent<number>) => void;
  value: number | '';
}

export const LanguageFormSelect = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { t } = useTranslation();

    const { data: languages } = useGetLanguagesQuery();

    return (
      <FormControl
        {...props.formControlType}
        disabled={props.disabled}
        error={props.error}
        ref={ref}
      >
        <InputLabel id="language-select-label">{t('language')}</InputLabel>
        <Select
          label={t('language')}
          labelId="language-select-label"
          onChange={props.onChange}
          value={props.value}
        >
          {languages?.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
        {props.helperText && (
          <FormHelperText sx={{ whiteSpace: 'pre-wrap' }}>
            {props.helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  },
);

LanguageFormSelect.displayName = 'LanguageFormSelect';
