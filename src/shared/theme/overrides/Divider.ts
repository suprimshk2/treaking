import { Theme } from '@mui/material/styles';

const Divider = (theme: Theme) => ({
  MuiDivider: {
    styleOverrides: {
      root: {
        border: `1px solid ${theme.palette.gray.light}`,
        opacity: 0.4,
      },
    },
  },
});

export default Divider;
