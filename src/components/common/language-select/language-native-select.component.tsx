import {
  FormControl,
  NativeSelect,
  OutlinedInput,
  styled,
} from '@mui/material';
import React from 'react';

import { Language } from '@lib/types';

const Option = styled('option')(({ theme }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
}));

interface P {
  languages: Language[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
}

export const LanguageNativeSelect = ({ languages, onChange, value }: P) => (
  <FormControl size="small" variant="outlined">
    <NativeSelect input={<OutlinedInput />} onChange={onChange} value={value}>
      {languages.map((l) => (
        <Option key={l.code} value={l.code}>
          {l.shortName.toUpperCase()}
        </Option>
      ))}
    </NativeSelect>
  </FormControl>
);
