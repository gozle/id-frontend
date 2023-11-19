import { Box } from '@mui/material';
import React from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg';

const sizeMap: Record<AvatarSize, number> = {
  sm: 6,
  md: 8,
  lg: 10,
};

interface P {
  size?: AvatarSize;
  src?: string | null;
}

export const Avatar = ({ size = 'md', src }: P) => (
  <Box
    sx={{
      borderRadius: '50%',
      width: (theme) => theme.spacing(sizeMap[size]),
      height: (theme) => theme.spacing(sizeMap[size]),
      background: 'lightgray',
      position: 'relative',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}
  >
    {src && <img src={src} alt="Avatar" style={{ height: '100%' }} />}
  </Box>
);
