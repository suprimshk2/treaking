import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from 'shared/theme/components/dialog';
import { DialogSize } from 'shared/theme/components/dialog/Dialog';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { Box } from '@mui/material';
import Alert from 'shared/theme/components/Alert';
import { IError } from 'shared/interfaces/http';
import { useEffect } from 'react';
import { DialogLoader } from 'shared/components/display/DialogLoader';
import { WinnerAddFormSchemaType, addWinnerFormSchema } from '../schemas';
import {
  useAddWinnerMutation,
  useQuizDetailQuery,
  useWinnerDetailQuery,
} from '../mutations';
import { WinnerAddEditForm } from './WinnerAddForm';

import { formatAddWinner } from '../utils';
import { Winner } from '../interfaces';

interface IProps {
  quizId: string;
  isEditMode: boolean;
  onClose: VoidFunction;
}

const defaultValues = {
  applyToAllQuizInCampaign: false,
  winners: [{ id: '', rank: 1, rankLabel: '', name: '' }],
};

export function WinnerAddModal({ quizId, isEditMode, onClose }: IProps) {
  const methods = useForm({
    // resolver: zodResolver(addWinnerFormSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const quizDetailQuery = useWinnerDetailQuery(quizId ?? '', {
    enabled: !!quizId,
  });
  const data: Winner[] = quizDetailQuery.data;

  useEffect(() => {
    if (data && isEditMode) {
      reset({
        applyToAllQuizInCampaign: false,
        winners: data,
      });
    }
  }, [data, reset]);

  const addWinnerMutation = useAddWinnerMutation();

  const onCloseModal = () => {
    reset(defaultValues);
    onClose();
  };

  const handleWinner = (data: typeof defaultValues) => {
    const payload: WinnerAddFormSchemaType = formatAddWinner(data);
    console.log({ payload });

    addWinnerMutation.mutate(
      { id: quizId, data: payload },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };

  const onSubmit = (data: typeof defaultValues) => {
    handleWinner(data);
  };

  const TEXT = {
    title: isEditMode ? 'Update Winner' : 'Add Winner',
    footerActionButtonText: 'Save',
    errorTitle: isEditMode ? 'Error updating winner' : 'Error adding winner',
  };

  // const mutation = isEditMode ? editUserMutation : addUserMutation;
  //   const mutation = addWinnerMutation;

  return (
    <Dialog
      title={TEXT.title}
      handleClose={onCloseModal}
      open
      size={DialogSize.MEDIUM}
    >
      {/* {winnerDetailQuery.isInitialLoading ? (
        <DialogLoader />
      ) : ( */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {/* {mutation.isError && (
              <Box mb={8}>
                <Alert
                  type="error"
                  title={TEXT.errorTitle}
                  description={(mutation.error as IError)?.message}
                />
              </Box>
            )} */}
            <WinnerAddEditForm isEditMode={isEditMode} gameId={quizId} />
          </DialogContent>
          <DialogFooter
            primaryButtonText={TEXT.footerActionButtonText}
            primaryButtonType="submit"
            secondaryButtonText="Cancel"
            isSubmitting={addWinnerMutation.isPending}
            onSecondaryButtonClick={onCloseModal}
          />
        </form>
      </FormProvider>
      {/* )} */}
    </Dialog>
  );
}
