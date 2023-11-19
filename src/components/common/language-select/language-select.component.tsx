import { MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import React from 'react';

import { Language } from '@lib/types';

interface P {
  languages: Language[];
  onChange: (event: SelectChangeEvent<string>) => void;
  value: string;
}

export const LanguageSelect = ({ languages, onChange, value }: P) => (
  <Select
    size="small"
    variant="outlined"
    value={value}
    onChange={onChange}
    sx={{ borderRadius: '0.5em' }}
  >
    {languages.map((l) => (
      <MenuItem key={l.code} value={l.code}>
        {l.shortName.toUpperCase()}
      </MenuItem>
    ))}
  </Select>
);
