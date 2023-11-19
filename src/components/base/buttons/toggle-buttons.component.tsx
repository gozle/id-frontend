import { styled, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

interface P<T> {
  buttons: { name: string; value: T }[];
  onChange: (event: React.MouseEvent<HTMLElement>, value: T | null) => void;
  value: T | null;
}

export const ToggleButtons = <T extends number | string>({
  buttons,
  onChange,
  value,
}: P<T>) => (
  <StyledToggleButtonGroup
    color="primary"
    exclusive
    onChange={onChange}
    value={value}
  >
    {buttons.map((el) => (
      <ToggleButton key={el.value} value={el.value}>
        {el.name}
      </ToggleButton>
    ))}
  </StyledToggleButtonGroup>
);
