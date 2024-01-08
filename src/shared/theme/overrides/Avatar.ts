import { Components, Theme } from '@mui/material/styles';
import typography from '../typography';

const Avatar = (theme: Theme): Components<Theme> => ({
  MuiAvatar: {
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
      },
      colorDefault: {
        '&.size-small': {
          fontSize: typography.bodyTextSmall.fontSize,
          fontWeight: theme.typography.fontWeightMedium,
          height: 32,
          width: 32,
          lineHeight: 'normal',
        },
        '&.size-medium': {
          fontWeight: theme.typography.fontWeightMedium,
          fontSize: theme.typography.bodyTextMedium.fontSize,
          height: 44,
          width: 44,
        },
        '&.size-large': {
          fontWeight: theme.typography.bodyTextMedium,
          fontSize: theme.typography.h6.fontSize,
          height: 64,
          width: 64,
        },
      },
    },
  },
});

export default Avatar;
