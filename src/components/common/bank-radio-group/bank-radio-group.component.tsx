import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  styled,
  radioClasses,
  formControlLabelClasses,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useGetBankListQuery } from '@services/pay';

import { HorizontalScrollContainer } from '../horizontal-scroll-container';

const MyFormControlLabel = styled(FormControlLabel)<
  FormControlProps & { icon: string | null }
>(({ theme, icon }) => ({
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  width: theme.spacing(18),
  paddingBottom: theme.spacing(1),
  backgroundColor:
    theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.grey[300],
  backgroundImage: icon ? `url(${icon})` : undefined,
  backgroundSize: '40%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top 0 left 0',
  borderRadius: theme.spacing(1),
  margin: `0 ${theme.spacing(1)} 0 0`,

  [`& > .${radioClasses.root}`]: {
    marginBottom: theme.spacing(2),
    alignSelf: 'flex-end',
  },
  [`& > .${formControlLabelClasses.label}`]: {
    textAlign: 'right',
    width: '100%',
    paddingRight: theme.spacing(2),
  },
}));

interface P {
  disabled?: boolean;
  error?: boolean;
  formControlType: Pick<FormControlProps, 'fullWidth' | 'size' | 'variant'>;
  helperText?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: number | '';
}

export const BankRadioGroup = React.forwardRef<HTMLDivElement, P>(
  (props, ref) => {
    const { t } = useTranslation();

    const { data: banks } = useGetBankListQuery();

    return (
      <FormControl
        {...props.formControlType}
        disabled={props.disabled}
        error={props.error}
        ref={ref}
      >
        <FormLabel id="bank-radio-group-label">{t('bank')}</FormLabel>
        <HorizontalScrollContainer>
          <RadioGroup
            name="bank-radio-group"
            onChange={props.onChange}
            row
            value={props.value}
            sx={{ flexWrap: 'nowrap' }}
          >
            {banks?.map((el) => (
              <MyFormControlLabel
                icon={el.icon}
                key={el.id}
                value={el.id}
                control={<Radio />}
                label={el.name}
                labelPlacement="start"
              />
            ))}
          </RadioGroup>
        </HorizontalScrollContainer>
        {props.helperText && (
          <FormHelperText sx={{ whiteSpace: 'pre-wrap' }}>
            {props.helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  },
);

BankRadioGroup.displayName = 'BankRadioGroup';
