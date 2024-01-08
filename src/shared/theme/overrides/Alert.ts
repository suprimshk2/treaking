import { AlertProps, Theme } from '@mui/material';
import typography from '../typography';

const Alert = (theme: Theme) => ({
  MuiAlert: {
    defaultProps: {
      variant: 'standard',
    } as AlertProps,
    styleOverrides: {
      root: {
        boxShadow: 'none',
        padding: 16,
        borderRadius: 4,
        ...typography.bodyTextMedium,
      },
      icon: {
        padding: 0,
        marginRight: 8,
        marginTop: -2,
      },
      message: {
        padding: 0,
      },
      standardError: {
        backgroundColor: theme.palette.error.lighter,
        color: theme.palette.error.dark,

        '& .MuiAlert-icon': {
          color: theme.palette.error.main,
        },
      },
      standardSuccess: {
        backgroundColor: theme.palette.success.lighter,
        color: theme.palette.success.dark,

        '& .MuiAlert-icon': {
          color: theme.palette.success.main,
        },
      },
      standardWarning: {
        backgroundColor: theme.palette.warning.lighter,
        color: theme.palette.warning.darker,

        '& .MuiAlert-icon': {
          color: theme.palette.warning.dark,
        },
      },
      standardInfo: {
        backgroundColor: theme.palette.info.lighter,
        color: theme.palette.info.dark,

        '& .MuiAlert-icon': {
          color: theme.palette.info.main,
        },
      },
    },
  },
  MuiAlertTitle: {
    styleOverrides: {
      root: {
        ...typography.bodyTextLargeMd,
        marginBottom: 8,
      },
    },
  },
});

export default Alert;
