import { Theme } from '@mui/material/styles';

const FormHelperText = (theme: Theme) => ({
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        ...theme.typography.bodyTextMedium,
        margin: '4px 0px 0px 0px',

        '&.Mui-error, &.error': {
          color: theme.palette.error.dark,
        },

        '&.success': {
          color: theme.palette.success.dark,
        },

        '&.warning': {
          color: theme.palette.warning.darker,
        },
      },
    },
  },
});

export default FormHelperText;
