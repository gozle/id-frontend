import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  InputAdornment,
  IconButton,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React, { useState } from 'react';

type P = TextFieldProps;

export const PasswordInput = React.forwardRef<HTMLInputElement, P>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      event.preventDefault();
    };

    return (
      <TextField
        {...props}
        InputProps={{
          ...props.InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                size="small"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputRef={ref}
        type={showPassword ? 'text' : 'password'}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
