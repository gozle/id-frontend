import { FormControlProps } from '@mui/material';

export const formControlType: Pick<
  FormControlProps,
  'fullWidth' | 'size' | 'variant'
> = {
  fullWidth: true,
  size: 'small',
  variant: 'outlined',
};
