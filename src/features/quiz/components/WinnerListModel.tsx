import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from 'shared/theme/components/dialog';
import { DialogSize } from 'shared/theme/components/dialog/Dialog';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { useTheme, Stack } from '@mui/material';
import Alert from 'shared/theme/components/Alert';
import { IError } from 'shared/interfaces/http';
import { useEffect } from 'react';
import { DialogLoader } from 'shared/components/display/DialogLoader';
import { WinnerAddFormSchemaType, addWinnerFormSchema } from '../schemas';
import { useAddWinnerMutation, useWinnerDetailQuery } from '../mutations';
import { WinnerAddEditForm } from './WinnerAddForm';

import { formatAddWinner } from '../utils';
import WinnerDetail from './WinnerDetail';

interface IProps {
  quizId: string;
  onClose: VoidFunction;
}

export function WinnerListModel({ quizId, onClose }: IProps) {
  const theme = useTheme();
  const TEXT = {
    title: 'Winners Details',
  };
  const onCloseModal = () => {
    onClose();
  };

  const winnerDetailQuery = useWinnerDetailQuery(quizId, {
    enabled: !!quizId,
  });
  const { data } = winnerDetailQuery;

  return (
    <Dialog
      title={TEXT.title}
      handleClose={onCloseModal}
      open
      size={DialogSize.MEDIUM}
    >
      {winnerDetailQuery.isLoading ? (
        <DialogLoader />
      ) : (
        <DialogContent
          sx={{
            margin: 0,
            paddingY: theme.spacing(5),
            paddingX: 0,
          }}
        >
          {/* {mutation.isError && (
              <Box mb={8}>
                <Alert
                  type="error"
                  title={TEXT.errorTitle}
                  description={(mutation.error as IError)?.message}
                />
              </Box>
            )} */}
          <Stack gap={theme.spacing(3)}>
            {data?.map((item) => <WinnerDetail profile={item} />)}
          </Stack>
        </DialogContent>
      )}
    </Dialog>
  );
}
