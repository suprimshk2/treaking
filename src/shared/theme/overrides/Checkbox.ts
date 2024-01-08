import { Components, Theme } from '@mui/material';

const Checkbox = (): Components<Theme> => ({
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        padding: 0,
        marginRight: 8,
        '& .MuiSvgIcon-root': { opacity: 0.7 },
      },
    },
  },
});

export default Checkbox;
