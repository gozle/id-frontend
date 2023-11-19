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

import { useGetCitiesQuery } from '@services/city';

interface P {
  disabled?: boolean;
  error?: boolean;
  formControlType: Pick<FormControlProps, 'fullWidth' | 'size' | 'variant'>;
  helperText?: string;
  onChange: (event: SelectChangeEvent<number>) => void;
  regionId: number;
  value: number | '';
}

export const CityFormSelect = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { i18n, t } = useTranslation();

    const { data: cities } = useGetCitiesQuery({
      lang: i18n.language,
      regionId: props.regionId,
    });

    return (
      <FormControl
        {...props.formControlType}
        disabled={props.disabled}
        error={props.error}
        ref={ref}
      >
        <InputLabel id="city-select-label">{t('city')}</InputLabel>
        <Select
          label={t('city')}
          labelId="city-select-label"
          onChange={props.onChange}
          value={props.value}
        >
          {cities?.map((el) => (
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

CityFormSelect.displayName = 'CityFormSelect';
