import { Components, Theme } from '@mui/material';
import { BsXLg } from 'react-icons/bs';

const Chip = (theme: Theme): Components<Theme> => ({
  MuiChip: {
    defaultProps: {
      variant: 'filled',
      size: 'medium',
      color: 'default',
      deleteIcon: <BsXLg />,
    },
    styleOverrides: {
      root: {
        background: theme.palette.gray.lighter,
        color: theme.palette.gray.dark,
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        height: 'auto',
        /**
         * className variants
         *
         */
        '&.chip-badge': {
          cursor: 'default',
          borderRadius: '4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
          color: theme.palette.common.white,
          ...theme.typography.bodyTextSmall,

          // '& .MuiChip-label': {
          //   fontWeight: theme.typography.fontWeightMedium,
          // },

          '&--default': {
            backgroundColor: theme.palette.gray.lighter,
            color: theme.palette.text.primary,
            border: `1px solid ${theme.palette.gray.light}`,
          },
          '&--info': {
            backgroundColor: theme.palette.info.main,
          },
          '&--success': {
            backgroundColor: theme.palette.success.main,
          },
          '&--warning': {
            backgroundColor: theme.palette.warning.main,
          },
          '&--error': {
            backgroundColor: theme.palette.error.main,
          },
        },
      },
      colorInfo: {
        backgroundColor: theme.palette.info.lighter,
        color: theme.palette.info.dark,
      },
      colorSuccess: {
        backgroundColor: theme.palette.success.lighter,
        color: theme.palette.success.dark,
      },
      colorWarning: {
        backgroundColor: theme.palette.warning.lighter,
        color: theme.palette.warning.darker,
      },
      colorError: {
        backgroundColor: theme.palette.error.lighter,
        color: theme.palette.error.dark,
      },
      label: {
        padding: 0,
      },

      sizeMedium: {
        fontSize: theme.typography.bodyTextMedium.fontSize,
      },

      sizeSmall: {
        fontSize: theme.typography.bodyTextSmall.fontSize,
      },

      deleteIcon: {
        color: theme.palette.gray.main,
        fontSize: 16,
        marginLeft: theme.spacing(1),
        marginRight: 0,
      },
    },
  },
});

export default Chip;
