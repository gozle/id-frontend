import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, styled } from '@mui/material';
import React from 'react';

const MyIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.background.paper,

  ['&:hover']: {
    background: theme.palette.grey[300],
  },
}));

interface P {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  variant: 'right' | 'left';
}

export const ArrowButton = ({ className, onClick, style, variant }: P) => (
  <MyIconButton
    className={className}
    style={style}
    size="small"
    onClick={onClick}
  >
    {variant === 'right' ? (
      <KeyboardArrowRightIcon />
    ) : (
      <KeyboardArrowRightIcon style={{ transform: 'rotate(180deg)' }} />
    )}
  </MyIconButton>
);
