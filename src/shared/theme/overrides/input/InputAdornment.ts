import { Theme } from '@mui/material/styles';

const InputAdornment = (theme: Theme) => ({
  MuiInputAdornment: {
    styleOverrides: {
      positionStart: {
        marginLeft: 8,
        marginRight: 0,
      },
      positionEnd: {
        marginLeft: 0,
        marginRight: 14,

        svg: {
          width: 16,
          height: 16,
        },
      },

      '&.Mui-disabled': {
        color: theme.palette.shade.main,
      },
    },
  },
});

export default InputAdornment;
