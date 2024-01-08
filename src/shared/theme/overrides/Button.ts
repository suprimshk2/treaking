import { ButtonBaseProps, ButtonProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    // Disable colors that are not in use
    info: false;
    success: false;
    warning: false;
    error: false;
  }

  interface ButtonPropsVariantOverrides {
    // Custom variants
    primaryGradient: true;
  }
}

const Button = (theme: Theme) => ({
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true, // No more ripple on buttons for the whole application
    } as ButtonBaseProps,
  },
  MuiButton: {
    defaultProps: {
      size: 'medium',
      color: 'primary',
      variant: 'contained',
    } as ButtonProps,
    variants: [
      {
        // Custom variant 'primaryGradient'
        props: { variant: 'primaryGradient' } as ButtonProps,
        style: {
          background: `linear-gradient(341.98deg, ${theme.palette.primary.main} 26.99%, ${theme.palette.primary.light} 99.3%)`,
          color: theme.palette.shade.darker,
        },
      },
    ],
    styleOverrides: {
      root: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: theme.customShadows.dropShadow1,
        },
        '&:active': {
          boxShadow: theme.customShadows.innerShadow,
        },
        '&:disabled': {
          opacity: 0.7,
          cursor: 'not-allowed',
          pointerEvents: 'auto',
          boxShadow: 'none',
        },
      },
      sizeSmall: {
        ...theme.typography.bodyTextMediumMd,
        borderRadius: 2,
        padding: '4px 8px',
      },
      sizeMedium: {
        ...theme.typography.bodyTextMediumMd,
        borderRadius: 4,
        padding: '8px 16px',
      },
      sizeLarge: {
        ...theme.typography.h6,
        borderRadius: 4,
        padding: '16px 32px',
      },
      startIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      endIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      iconSizeLarge: {
        width: 20,
        height: 20,
        '&.Mui-Button-startIcon': {
          marginRight: 8,
        },
        '&.Mui-Button-endIcon': {
          marginLeft: 8,
        },
      },
      iconSizeMedium: {
        width: 16,
        height: 16,
        '&.Mui-Button-startIcon': {
          marginRight: 8,
        },
        '&.Mui-Button-endIcon': {
          marginLeft: 8,
        },
      },
      iconSizeSmall: {
        width: 14,
        height: 14,
        '&.Mui-Button-startIcon': {
          marginRight: 4,
        },
        '&.Mui-Button-endIcon': {
          marginLeft: 4,
        },
      },
      containedPrimary: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        '&:hover, &:active, &:disabled': {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main,
        },
      },
      outlinedPrimary: {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.common.white,
        '&:hover': {
          boxShadow: 'none',
          backgroundColor: theme.palette.primary.lighter,
        },
        '&:active': {
          backgroundColor: theme.palette.primary.lighter,
          boxShadow: theme.customShadows.innerShadow,
        },
        '&:disabled': {
          border: `1px solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
          boxShadow: 'none',
        },
        // Note: Padding for outlined buttons are set separately to adjust 2px in height due to 1px all round border
        '&.MuiButton-sizeLarge': {
          padding: '15px 32px',
        },
        '&.MuiButton-sizeMedium': {
          padding: '7px 16px',
        },
        '&.MuiButton-sizeSmall': {
          padding: '3px 8px',
        },
      },
      textPrimary: {
        // backgroundColor: theme.palette.common.white,
        '&:hover': {
          // boxShadow: theme.customShadows.dropShadow1,
          boxShadow: 'none',
          backgroundColor: 'inherit',
          textDecoration: 'underline',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: 'inherit',
          // boxShadow: theme.customShadows.innerShadow,
        },
        '&:disabled': {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.common.white,
          boxShadow: 'none',
          textDecoration: 'none',
        },
      },
    },
  },
});

export default Button;
