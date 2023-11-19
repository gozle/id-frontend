import { Box, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import React from 'react';

type P = TextFieldProps;

export const PhoneInput = React.forwardRef<HTMLInputElement, P>(
  (props, ref) => (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        startAdornment: (
          <InputAdornment position="start">
            <Box sx={{ fontWeight: 700 }}>+993</Box>
          </InputAdornment>
        ),
      }}
      inputRef={ref}
    />
  ),
);

PhoneInput.displayName = 'PhoneInput';
