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

import { ColorScheme } from '@lib/enums';

interface P {
  disabled?: boolean;
  error?: boolean;
  formControlType: Pick<FormControlProps, 'fullWidth' | 'size' | 'variant'>;
  helperText?: string;
  onChange: (event: SelectChangeEvent<ColorScheme>) => void;
  value: ColorScheme | '';
}

export const ColorSchemeSelect = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { t } = useTranslation();

    return (
      <FormControl
        {...props.formControlType}
        disabled={props.disabled}
        error={props.error}
        ref={ref}
      >
        <InputLabel id="color-scheme-select-label">
          {t('color_scheme')}
        </InputLabel>
        <Select
          label={t('color_scheme')}
          labelId="color-scheme-select-label"
          onChange={props.onChange}
          value={props.value}
        >
          {Object.values(ColorScheme).map((el) => (
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

ColorSchemeSelect.displayName = 'ColorSchemeSelect';
