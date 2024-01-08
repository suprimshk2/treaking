import { Theme } from '@mui/material/styles';

export const DialogTitle = (theme: Theme) => ({
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: theme.spacing(4),
        boxShadow: theme.customShadows.dropShadow1,

        // ClassName Variants

        // As MUI doesn't have variants for DialogTitle, we introduced className variants.
        // Use the respective class for the variant you want

        // Variant = 'title-sm', use className="'title-sm'" in <DialogTitle /> for using this variant
        '&.title-sm': {
          ...theme.typography.bodyTextLargeMd,
        },
        // Variant = 'title-md', use className="'title-md'" in <DialogTitle /> for using this variant
        '&.title-md': {
          ...theme.typography.h6,
        },
        // Variant = 'title-lg', use className="'title-lg'" in <DialogTitle /> for using this variant
        '&.title-lg': {
          ...theme.typography.h6,
        },
      },
    },
  },
});
