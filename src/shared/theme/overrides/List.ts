import { Components, Theme } from '@mui/material/styles';

const List = (theme: Theme): Components<Theme> => ({
  MuiList: {
    styleOverrides: {
      root: {
        // Styles for dropdown list
        '&.MuiSelect-list': {
          borderRadius: 4,
          padding: 0,

          '& .MuiMenuItem-root': {
            ...theme.typography.bodyTextLarge,
            color: theme.palette.shade.darker,
            padding: `${theme.spacing(2)} ${theme.spacing(4)}`,

            '&:hover': {
              backgroundColor: theme.palette.primary.lighter,
            },
          },
        },
        //----------------------------------

        // Styles for popover menu list
        '&.MuiPopover-list': {
          padding: `${theme.spacing(2)} 0px`,
          '& .MuiListItemButton-root': {
            ...theme.typography.bodyTextMedium,
            color: theme.palette.gray.dark,
            padding: `${theme.spacing(2)} ${theme.spacing(4)}`,

            '&:hover': {
              backgroundColor: theme.palette.primary.lighter,
            },

            '& .MuiListItemIcon-root': {
              minWidth: 'unset',
              marginRight: theme.spacing(2),
              '& svg': {
                width: theme.spacing(4),
                height: theme.spacing(4),
              },
            },
          },
          '&.compact': {
            '& .MuiListItemButton-root': {
              padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
            },
          },
        },
        '&.fixed-height': {
          maxHeight: '380px',
          overflowY: 'auto',
        },
        //----------------------------------
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        '&.with-bottom-border': {
          borderBottom: `1px solid ${theme.palette.gray.light}`,
          // '&:last-child': {
          //   borderBottom: 'none',
          // },
        },
      },
    },
  },
});

export default List;
