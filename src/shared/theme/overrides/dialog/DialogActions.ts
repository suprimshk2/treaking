import { Theme } from '@mui/material/styles';

export const DialogActions = (theme: Theme) => ({
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: theme.spacing(2),
        background: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: theme.customShadows.dropShadow1,
      },
    },
  },
});
