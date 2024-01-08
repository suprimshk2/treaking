import { TableProps } from '@mui/material';
import { Components, Theme } from '@mui/material/styles';
import { hexToRgbA } from 'shared/utils/misc';

const Table = (theme: Theme): Components<Theme> => ({
  MuiTableContainer: {
    styleOverrides: {
      root: {
        // height: 'calc(100vh - 160px)',
        tableLayout: 'fixed',
        boxShadow: 'none',
        '&.full-height': {
          height: 'calc(100vh - 203px)',
        },
      },
    },
  },
  MuiTable: {
    defaultProps: {
      size: 'small',
      // stickyHeader: true,
    } as TableProps,
    styleOverrides: {
      root: {
        '&.with-border': {
          border: `1px solid ${theme.palette.gray.light}`,
          borderRadius: '4px',
        },
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        whiteSpace: 'nowrap',
        // 'filled' ->  ClassName Variant for <TableHead />
        // To use this variant, use 'filled' className like <TableHead className="filled" />
        color: theme.palette.gray.darker,
        '&.filled': {
          '& .MuiTableCell-head': {
            backgroundColor: theme.palette.primary.lighter,
            color: theme.palette.text.primary,
            borderBottom: 'none',
          },
        },

        /**
         * Use `size` prop in the <Table /> component if you want size="medium" or size="small" in both table head and table body
         *
         * However, if you want a hybrid say table head of sizeMedium and table body of sizeSmall,
         * use size = 'small' prop in <Table /> component and use this className variant in <TableHead /> component
         * like <TableHead className="sizeMedium" />
         *
         */
        // 'sizeSmall' ->  ClassName Variant for <TableRow />
        // To use this variant, use 'filled' className like <TableHead className="sizeSmall" />
        '&.sizeSmall': {
          '& .MuiTableCell-head': {
            padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
          },
        },
        // 'sizeSmall' ->  ClassName Variant for <TableRow />
        // To use this variant, use 'filled' className like <TableHead className="sizeSmall" />
        '&.sizeMedium': {
          '& .MuiTableCell-head': {
            padding: theme.spacing(2),
          },
        },
      },
    },
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&.row': {
          '&--with-collapsible-row': {
            '& .MuiTableCell-root': {
              borderBottom: 'none',
            },
          },

          '&--collabsible': {
            backgroundColor: theme.palette.common.white,
          },

          '&--collabsible-without-bottom-border': {
            backgroundColor: theme.palette.gray.lighter,
            '& .MuiTableCell-root': {
              borderBottom: 'none',
            },
          },
        },
        '&.alternate-shaded:nth-of-type(even)': {
          backgroundColor: theme.palette.shade.lighter,
        },

        '&:hover': {
          backgroundColor: theme.palette.gray.lighter,
        },

        '&.no-hover': {
          '&:hover': {
            backgroundColor: 'unset',
          },
        },
        // '&:nth-of-type(even)': {
        //   backgroundColor: theme.palette.gray.lighter,
        // },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        whiteSpace: 'nowrap',
        borderBottom: '1px solid',
        borderBottomColor: hexToRgbA(theme.palette.shade.light, 0.5),
        color: theme.palette.text.secondary,
        '&.no-padding': {
          padding: 0,
        },
        '&.with-border': {
          borderLeft: `1px solid ${theme.palette.gray.light}`,
        },
      },
      head: {
        ...theme.typography.bodyTextMediumMd,
        color: theme.palette.gray.darker,
      },
      body: {
        ...theme.typography.bodyTextMedium,
        color: theme.palette.gray.dark,
        whiteSpace: 'break-spaces',
      },
      sizeMedium: {
        padding: theme.spacing(2),
      },
      sizeSmall: {
        padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
      },
    },
  },
});

export default Table;
