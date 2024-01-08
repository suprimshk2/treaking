import { Box } from '@mui/material';
import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export function CenterRowSpaceBetween({ children }: IProps) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      {children}
    </Box>
  );
}
