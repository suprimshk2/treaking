import { Theme } from '@mui/material/styles';

const Popover = (theme: Theme) => ({
  MuiPopover: {
    styleOverrides: {
      root: {
        marginTop: theme.spacing(2),
      },
    },
  },
});

export default Popover;
