import { SxProps, Button as MuiButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

export enum ButtonVariant {
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
  TEXT = 'text',
  PRIMARY_GRADIENT = 'primaryGradient',
}

export enum ButtonType {
  NORMAL = 'normal',
  LOADING = 'loading',
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface IProps {
  buttonType?: ButtonType;
  type?: 'submit' | 'button';
  size: ButtonSize;
  variant?: ButtonVariant;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  sx?: SxProps;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  buttonType,
  type,
  size,
  variant,
  children,
  prefix,
  suffix,
  disabled,
  loading,
  sx,
  fullWidth,
  onClick,
}: IProps) {
  if (buttonType === ButtonType.LOADING) {
    return (
      <LoadingButton
        type={type}
        variant={variant}
        size={size}
        startIcon={prefix}
        endIcon={suffix}
        disabled={disabled}
        loading={loading}
        loadingPosition={prefix ? 'start' : undefined}
        sx={sx}
        fullWidth={fullWidth}
        onClick={onClick}
      >
        {children}
      </LoadingButton>
    );
  }

  return (
    <MuiButton
      type={type}
      variant={variant}
      size={size}
      disabled={disabled}
      startIcon={prefix}
      endIcon={suffix}
      sx={sx}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
}

Button.defaultProps = {
  prefix: undefined,
  suffix: undefined,
  disabled: false,
  loading: false,
  type: 'button',
  sx: undefined,
  fullWidth: false,
  buttonType: ButtonType.NORMAL,
  onClick: undefined,
  variant: ButtonVariant.CONTAINED,
};
