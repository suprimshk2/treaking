import { Theme } from '@mui/material/styles';

const FormControlLabel = (theme: Theme) => ({
  MuiFormControlLabel: {
    styleOverrides: {
      label: {
        ...theme.typography.bodyTextLarge,
        color: theme.palette.shade.dark,
      },
    },
  },
});

export default FormControlLabel;
