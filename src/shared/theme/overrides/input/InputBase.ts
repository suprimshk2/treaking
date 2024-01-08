import { Theme } from '@mui/material/styles';

const InputBase = (theme: Theme) => ({
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: `1px solid ${theme.palette.gray.light}`,
        borderRadius: 4,
        backgroundColor: theme.palette.gray.lighter,

        'label + &': {
          marginTop: theme.spacing(6),
        },
        textarea: {
          padding: theme.spacing(2),
          ...theme.typography.bodyTextMedium,
          color: theme.palette.text.primary,
          '&::placeholder': {
            ...theme.typography.bodyTextMedium,
            color: theme.palette.gray.main,
            opacity: 1,
          },

          '&.Mui-disabled': {
            cursor: 'not-allowed',
          },
          resize: 'vertical',
          maxHeight: '500px',
        },

        input: {
          textOverflow: 'ellipsis',
          // Note: Padding Y adusted to account 2px addition in height due to 1px all round border
          padding: theme.spacing(2),
          ...theme.typography.bodyTextMedium,
          color: theme.palette.text.primary,
          // Uncomment below style if you want a different color for input:focused state
          // '&:active': {
          //   borderColor: theme.palette.shade.darker,
          // },

          '&::placeholder': {
            ...theme.typography.bodyTextMedium,
            color: theme.palette.gray.main,
            opacity: 1,
            textOverflow: 'ellipsis',
          },

          '&.Mui-disabled': {
            cursor: 'not-allowed',
          },
        },

        // '&:hover': {
        //   borderColor: theme.palette.shade.main,
        // },

        '&.Mui-disabled': {
          // borderColor: theme.palette.gray.light,
          opacity: 0.6,
          cursor: 'not-allowed',
        },

        '& .MuiInputAdornment-positionEnd': {
          color: theme.palette.gray.main,
        },

        '& .MuiInputAdornment-positionStart': {
          color: theme.palette.gray.main,
        },

        '&.Mui-focused': {
          borderColor: theme.palette.primary.light,
        },

        '&.Mui-error': {
          borderColor: theme.palette.error.main,

          '& .MuiInputAdornment-positionEnd': {
            color: theme.palette.error.main,
          },
        },
      },

      colorWarning: {
        borderColor: theme.palette.warning.dark,

        '& .MuiInputAdornment-positionEnd': {
          color: theme.palette.warning.dark,
        },
      },

      colorSuccess: {
        borderColor: theme.palette.success.main,

        '& .MuiInputAdornment-positionEnd': {
          color: theme.palette.success.main,
        },
      },

      colorError: {
        borderColor: theme.palette.error.main,

        '& .MuiInputAdornment-positionEnd': {
          color: theme.palette.error.main,
        },
      },
      colorInfo: {
        borderColor: theme.palette.info.main,
        background: theme.palette.info.main,
        color: theme.palette.common.white,
        '& .MuiInputAdornment-positionEnd': {
          color: theme.palette.common.white,
        },
        '& .MuiSvgIcon-root': {
          color: 'white',
        },
      },
    },
  },
});

export default InputBase;
