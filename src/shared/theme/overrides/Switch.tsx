import { Components, Theme } from '@mui/material';

const Switch = (theme: Theme): Components<Theme> => ({
  MuiSwitch: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        width: 44,
        height: 24,
        padding: 0,
      },
      switchBase: {
        padding: 2,
        margin: 2,
        '&.Mui-checked+.MuiSwitch-track': {
          opacity: '1 !important',
        },
        '&.Mui-disabled+.MuiSwitch-track': {
          opacity: '0.5 !important',
          cursor: 'not-allowed',
        },
      },
      thumb: {
        width: 16,
        height: 16,
        backgroundColor: theme.palette.gray.lighter,
      },
      track: {
        borderRadius: 12,
        backgroundColor: theme.palette.gray.light,
        opacity: 1,
      },
    },
  },
});

export default Switch;
