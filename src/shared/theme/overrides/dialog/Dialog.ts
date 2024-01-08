import { Theme } from '@mui/material/styles';

export const Dialog = (theme: Theme) => ({
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.customShadows.dropShadow1,
        borderRadius: 4,
      },

      // Controls the width (maxWidth to be specific) of the dialog
      paperWidthXs: {
        maxWidth: '0px', // set to '0px' as dialog of size='xs' is not in the styleguide
      },
      paperWidthSm: {
        maxWidth: '400px',
      },
      paperWidthMd: {
        maxWidth: '600px',
      },
      paperWidthLg: {
        maxWidth: '800px',
      },
      paperWidthxl: {
        maxWidth: '0px', // set to '0px' as dialog of size='xl' is not in the styleguide
      },
    },
  },
});
