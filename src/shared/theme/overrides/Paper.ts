import { Theme } from '@mui/material/styles';

const Paper = (theme: Theme) => ({
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: theme.customShadows.dropShadow1,
        // Styles for dropdown list wrapper
        '&.MuiSelect-menu-paper': {
          backgroundColor: theme.palette.common.white,
          paddingTop: 0,
          boxShadow: theme.customShadows.dropShadow1,
          '& .MuiList-root': {
            maxHeight: '360px',
            overflow: 'auto',
          },
        },
        //---------------------------------

        // Styles for popover content wrapper
        '&.MuiPopover-menu-paper': {
          backgroundColor: theme.palette.common.white,
          borderRadius: 4,
          boxShadow: theme.customShadows.dropShadow1,
          overflow: 'inherit',
        },

        '&.border-only': {
          boxShadow: 'none',
          border: `1px solid ${theme.palette.gray.light}`,
          borderRadius: 8,
        },
        //---------------------------------
      },
    },
  },
});

export default Paper;
