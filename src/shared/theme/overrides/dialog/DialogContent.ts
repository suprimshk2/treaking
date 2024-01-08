import { Theme } from '@mui/material/styles';
import { hexToRgbA } from 'shared/utils/misc';

export const DialogContent = (theme: Theme) => ({
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: theme.spacing(4),
        ...theme.typography.bodyTextLarge,
      },
      dividers: {
        borderTop: `1px solid`,
        borderBottom: `none`,
        borderColor: hexToRgbA(theme.palette.shade.light, 0.4),
      },
    },
  },
});
