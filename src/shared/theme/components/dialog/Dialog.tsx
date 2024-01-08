import * as React from 'react';

import {
  Box,
  Dialog as MuiDialog,
  DialogContent,
  Breakpoint,
} from '@mui/material';

import { IconType } from 'react-icons/lib';
import { DialogTitle } from './DialogTitle';

export enum DialogSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface IProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  handleClose?: VoidFunction;
  icon?: IconType;
  size?: DialogSize;
}

const sizeConfig = {
  [DialogSize.SMALL]: {
    maxWidth: 'sm' as Breakpoint,
    titleClassName: 'title-sm',
  },
  [DialogSize.MEDIUM]: {
    maxWidth: 'md' as Breakpoint,
    titleClassName: 'title-md',
  },
  [DialogSize.LARGE]: {
    maxWidth: 'lg' as Breakpoint,
    titleClassName: 'title-lg',
  },
};

function Dialog({
  open,
  handleClose,
  title,
  children,
  icon,
  size = DialogSize.MEDIUM,
}: IProps) {
  const Icon = icon;

  const onClose = (event: React.MouseEvent<HTMLElement>, reason?: string) => {
    if (reason && reason === 'backdropClick') return;

    if (handleClose) {
      handleClose();
    }
  };

  return (
    <MuiDialog
      aria-labelledby="modal-title"
      disableEscapeKeyDown
      fullWidth
      onClose={onClose}
      open={open}
      maxWidth={sizeConfig[size].maxWidth}
    >
      <DialogTitle
        id="modal-title"
        onClose={handleClose}
        className={sizeConfig[size].titleClassName}
      >
        {Icon && (
          <Box>
            <Icon />
          </Box>
        )}

        {title}
      </DialogTitle>
      {children}
    </MuiDialog>
  );
}

Dialog.defaultProps = {
  icon: null,
  handleClose: undefined,
  size: DialogSize.MEDIUM,
};

export { Dialog, DialogContent };
