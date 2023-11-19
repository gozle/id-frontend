import { styled } from '@mui/material';
import React, { ReactNode } from 'react';

const Root = styled('div')`
  position: fixed;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyScreenLayout: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return <Root>{children}</Root>;
};
