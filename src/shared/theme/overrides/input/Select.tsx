import { SelectProps } from '@mui/material/Select/Select';
import { Theme } from '@mui/material/styles';

const Select = (theme: Theme) => ({
  MuiSelect: {
    defaultProps: {
      MenuProps: {
        classes: {
          /**
           * The dropdown menu (options) falls outside the input element in the hierarchy.
           * So, we are styling the dropdown menu with className approach
           *
           * Styles for paper and list are written in respective files (i.e. List.ts and Paper.ts)
           */
          paper: 'MuiSelect-menu-paper',
          list: 'MuiSelect-list',
        },
      },
    } as SelectProps,
    styleOverrides: {
      select: {
        // Note: Padding Y adusted to account 2px addition in height due to 1px all round border
        padding: `6px 8px`,
        ...theme.typography.bodyTextLarge,
      },
    },
  },
});

export default Select;
