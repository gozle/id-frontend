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

import { Gender } from '@lib/enums';

interface P {
  disabled?: boolean;
  error?: boolean;
  formControlType: Pick<FormControlProps, 'fullWidth' | 'size' | 'variant'>;
  helperText?: string;
  onChange: (event: SelectChangeEvent<Gender>) => void;
  value: Gender | '';
}

export const GenderSelect = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { t } = useTranslation();

    return (
      <FormControl
        {...props.formControlType}
        disabled={props.disabled}
        error={props.error}
        ref={ref}
      >
        <InputLabel id="gender-select-label">{t('gender')}</InputLabel>
        <Select
          label={t('gender')}
          labelId="gender-select-label"
          onChange={props.onChange}
          value={props.value}
        >
          {Object.values(Gender).map((el) => (
            <MenuItem key={el} value={el}>
              {t(el)}
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

GenderSelect.displayName = 'GenderSelect';
