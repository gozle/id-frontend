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

import { useGetRegionsQuery } from '@services/region';

interface P {
  disabled?: boolean;
  error?: boolean;
  formControlType: Pick<FormControlProps, 'fullWidth' | 'size' | 'variant'>;
  helperText?: string;
  onChange: (event: SelectChangeEvent<number>) => void;
  value: number | '';
}

export const RegionFormSelect = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { i18n, t } = useTranslation();

    const { data: regions } = useGetRegionsQuery({ lang: i18n.language });

    return (
      <FormControl
        {...props.formControlType}
        disabled={props.disabled}
        error={props.error}
        ref={ref}
      >
        <InputLabel id="region-select-label">{t('region')}</InputLabel>
        <Select
          label={t('region')}
          labelId="region-select-label"
          onChange={props.onChange}
          value={props.value}
        >
          {regions?.map((el) => (
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

RegionFormSelect.displayName = 'RegionFormSelect';
