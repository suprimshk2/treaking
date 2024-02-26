import { DialogActions, useTheme } from '@mui/material';
import { Button, ButtonSize, ButtonType, ButtonVariant } from '../Button';

interface IProps {
  primaryButtonText: string;
  primaryButtonType?: 'button' | 'submit';
  onPrimaryButtonClick?: VoidFunction;
  secondaryButtonText?: string;
  secondaryButtonType?: 'button' | 'submit';
  onSecondaryButtonClick?: VoidFunction;
  isSubmitting?: boolean;
}

export function DialogFooter({
  primaryButtonText,
  primaryButtonType = 'button',
  onPrimaryButtonClick,
  secondaryButtonText,
  secondaryButtonType = 'button',
  onSecondaryButtonClick,
  isSubmitting,
}: IProps) {
  const theme = useTheme();
  return (
    <DialogActions>
      <Button
        size={ButtonSize.MEDIUM}
        variant={ButtonVariant.TEXT}
        type={secondaryButtonType}
        onClick={onSecondaryButtonClick}
        disabled={isSubmitting}
        sx={{ color: theme.palette.gray.dark }}
      >
        {secondaryButtonText}
      </Button>

      <Button
        size={ButtonSize.MEDIUM}
        buttonType={ButtonType.LOADING}
        type={primaryButtonType}
        onClick={onPrimaryButtonClick}
        loading={isSubmitting}
        sx={{ color: theme.palette.common.black }}
      >
        {primaryButtonText}
      </Button>
    </DialogActions>
  );
}

DialogFooter.defaultProps = {
  primaryButtonType: 'button',
  secondaryButtonType: 'button',
  onPrimaryButtonClick: undefined,
  onSecondaryButtonClick: undefined,
  isSubmitting: false,
  secondaryButtonText: '',
};
