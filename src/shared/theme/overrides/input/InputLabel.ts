import { Theme } from '@mui/material/styles';

const InputLabel = (theme: Theme) => ({
  MuiInputLabel: {
    styleOverrides: {
      root: {
        ...theme.typography.bodyTextMedium,
        transform: 'none',

        '&.Mui-focused': {
          color: theme.palette.secondary.darker,
        },

        '&.Mui-disabled': {
          color: theme.palette.shade.dark,
        },

        '&.MuiFormLabel-colorWarning': {
          color: theme.palette.warning.darker,
        },

        '&.MuiFormLabel-colorSuccess': {
          color: theme.palette.shade.dark,
        },

        '&.MuiFormLabel-colorError': {
          color: theme.palette.error.main,
        },
      },
    },
  },
});

export default InputLabel;
