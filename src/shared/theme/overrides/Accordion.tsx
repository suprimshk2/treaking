import { Components, Theme } from '@mui/material';

const Accordion = (theme: Theme): Components<Theme> => ({
  MuiAccordion: {
    styleOverrides: {
      root: {
        backgroundColor: 'inherit',
        '&.transparent': {
          '&:before': {
            display: 'none',
          },
          '&.MuiPaper-root': {
            boxShadow: 'none',
            border: 'none',
          },
        },
      },
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        height: 'auto',
        minHeight: '20px',
        padding: 0,
        ...theme.typography.bodyTextMedium,
      },
      content: {
        margin: 'auto',
        padding: theme.spacing(2),
        paddingLeft: 0,
      },
    },
  },
});

export default Accordion;
