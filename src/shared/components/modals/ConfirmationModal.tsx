import { Typography } from '@mui/material';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from 'shared/theme/components/dialog';
import { DialogSize } from 'shared/theme/components/dialog/Dialog';

interface IProps {
  cancelButtonLabel?: string;
  isOpen: boolean;
  onCancel: VoidFunction;
  onConfirm: VoidFunction;
  modalTitle: string;
  modalContent: string | JSX.Element;
  isSubmitting: boolean;
  submitButtonLabel?: string;
}

export function ConfirmationModal({
  isOpen,
  onCancel,
  onConfirm,
  modalTitle,
  modalContent,
  isSubmitting,
  submitButtonLabel = 'Confirm',
  cancelButtonLabel = 'Cancel',
}: IProps): JSX.Element {
  return (
    <Dialog
      title={modalTitle}
      handleClose={onCancel}
      open={isOpen}
      size={DialogSize.MEDIUM}
    >
      <DialogContent dividers>
        <Typography variant="bodyTextLarge">{modalContent}</Typography>
      </DialogContent>
      <DialogFooter
        onPrimaryButtonClick={onConfirm}
        onSecondaryButtonClick={onCancel}
        primaryButtonText={submitButtonLabel}
        secondaryButtonText={cancelButtonLabel}
        primaryButtonType="button"
        isSubmitting={isSubmitting}
      />
    </Dialog>
  );
}

ConfirmationModal.defaultProps = {
  cancelButtonLabel: 'Cancel',
  submitButtonLabel: 'Confirm',
};

export default ConfirmationModal;
