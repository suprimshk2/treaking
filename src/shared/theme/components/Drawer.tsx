import { Drawer as MuiDrawer, useTheme, Box } from '@mui/material';
import { useEffect } from 'react';
import { SETTINGS_BAR_PROPERTY } from 'shared/constants/settings';
import { useResize } from 'shared/hooks/misc';

export interface IDrawerProps {
  children: React.ReactNode;
  width?: string | number;
  direction?: 'left' | 'right';
  open?: boolean;
  right?: string;
  resizable?: boolean;
  zIndex?: number;
}
const { DRAWER_WIDTH, HEADER_HEIGHT } = SETTINGS_BAR_PROPERTY;

export function Drawer({
  children,
  width,
  direction,
  open,
  right,
  resizable,
  zIndex,
}: IDrawerProps) {
  const {
    width: resizedWidth,
    enableResize,
    reset,
  } = useResize({ minWidth: 400 });
  const theme = useTheme();
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);
  return (
    <MuiDrawer
      anchor={direction}
      open={open}
      PaperProps={{
        sx: {
          width: resizable ? resizedWidth : width,
          right,
          maxHeight: `calc(100% - ${HEADER_HEIGHT})`,
          top: `calc(${HEADER_HEIGHT})`,
          backgroundColor: theme.palette.background.default,
          boxShadow: 'none',
          overflow: 'auto',
          zIndex,
        },
      }}
      variant="persistent"
    >
      {children}
      {resizable && (
        <Box
          sx={{
            position: 'absolute',
            width: '5px',
            top: '0',
            left: '-1px',
            bottom: '0',
            userSelect: 'none',
            cursor: 'col-resize',
          }}
          onMouseDown={enableResize}
        />
      )}
    </MuiDrawer>
  );
}

Drawer.defaultProps = {
  width: DRAWER_WIDTH,
  direction: 'left',
  open: true,
  right: undefined,
  resizable: false,
  zIndex: undefined,
};
