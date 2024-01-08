import { Theme } from '@mui/material/styles';

const Tab = (theme: Theme) => ({
  MuiTab: {
    styleOverrides: {
      root: {
        '&.Mui-selected': { ...theme.typography.bodyTextLargeMd },
        ...theme.typography.bodyTextLarge,
      },
    },
  },
});

export default Tab;
