import { IconButtonProps } from '@mui/material';
import { Components, Theme } from '@mui/material/styles';

const IconButton = (theme: Theme): Components<Theme> => ({
  MuiIconButton: {
    defaultProps: {
      size: 'medium',
    } as IconButtonProps,
    styleOverrides: {
      root: {
        // ClassName Variants

        // As MUI doesn't have variants for IconButton, we introduced className variants.
        // Use the respective class for the variant you want

        // Variant = 'filled-white', use className="filled-white" in <IconButton /> for using this variant
        '&.filled-white': {
          color: theme.palette.gray.dark,
          backgroundColor: theme.palette.gray.lighter,
          border: `1px solid ${theme.palette.gray.light}`,
          '&:active': {
            backgroundColor: theme.palette.gray.lighter,
            boxShadow: theme.customShadows.innerShadow,
          },
          '&:disabled': {
            opacity: 0.4,
            cursor: 'not-allowed',
            pointerEvents: 'auto',
          },
          '&.no-border': {
            border: 'none',
          },
        },
      },

      //------------------------------

      sizeMedium: {
        // width: theme.spacing(10),
        // height: theme.spacing(10),
        padding: theme.spacing(2),
      },
      sizeSmall: {
        padding: theme.spacing(1.5),
      },
    },
  },
});

export default IconButton;
