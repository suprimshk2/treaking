import React, { useEffect, useRef, useState } from 'react';

import { IconButton, Popover as MuiPopover, SxProps, Box } from '@mui/material';
import { IconType } from 'react-icons/lib';

interface Props {
  buttonIcon?: IconType;
  children: React.ReactNode;
  isIconButton?: boolean;
  sx?: SxProps;
  triggerElement?: React.ReactNode;
  open?: boolean;
  setOpen?: (state: boolean) => void;
  buttonSize?: 'small' | 'medium';
  closeHandler?: VoidFunction;
}

function Popover({
  children,
  isIconButton,
  buttonIcon,
  sx,
  triggerElement,
  open,
  setOpen,
  closeHandler,
  buttonSize,
  ...other
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const btnRef = useRef<null | HTMLButtonElement>(null);

  const handleClose = () => {
    setAnchorEl(null);

    if (closeHandler) {
      closeHandler();
    }
  };

  // Note: We can assign state/function to ref and use the ref in the side-effect
  // if we don't need to run the side effect if the state/function changes
  const handleCloseRef = useRef(handleClose);

  const handleMouseLeave = () => {
    if (open) return;
    handleClose();
  };

  useEffect(() => {
    if (open) {
      btnRef?.current?.click();
    } else {
      handleCloseRef.current();
    }
  }, [open, handleCloseRef]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (setOpen) {
      setOpen(true);
    }
    setAnchorEl(event.currentTarget);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? 'simple-popover' : undefined;
  const Icon = buttonIcon;

  return (
    <>
      {isIconButton && Icon && (
        <IconButton
          aria-label="popover-trigger-button"
          className={`${isOpen && 'filled-white--hovered'}`}
          onClick={handleClick}
          ref={btnRef}
          size={buttonSize}
        >
          <Icon />
        </IconButton>
      )}

      {!isIconButton && triggerElement && (
        <Box
          component="button"
          ref={btnRef}
          onClick={handleClick}
          border="none"
          bgcolor="transparent"
          sx={{ cursor: 'pointer' }}
        >
          {triggerElement}
        </Box>
      )}

      <MuiPopover
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        disableRestoreFocus
        disableScrollLock={false}
        id={id}
        onClose={handleClose}
        open={isOpen}
        PaperProps={{
          onMouseLeave: handleMouseLeave,
          /**
           * Paper (wrapper for the popover content) falls outside the popover element in the hierarchy.
           * So, we are styling it with className approach
           *
           * Styles for paper are written in its own file (i.e. shared/theme/overrides/Paper.ts)
           */
          className: 'MuiPopover-menu-paper',
          sx: {
            ...sx,
          },
        }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        {...other}
      >
        {children}
      </MuiPopover>
    </>
  );
}

Popover.defaultProps = {
  sx: undefined,

  isIconButton: true,
  triggerElement: undefined,
  open: false,
  setOpen: undefined,
  closeHandler: undefined,
  buttonSize: 'medium',
  buttonIcon: undefined,
};

export default Popover;
