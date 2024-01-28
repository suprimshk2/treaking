import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { IError } from 'shared/interfaces/http';
import { IFileSchema } from 'features/product/interfaces';
import * as productAPI from './api';

export const useUploadImageMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (file: IFileSchema) => productAPI.uploadImage(file),
    onSuccess: (res) => {
      enqueueSnackbar(res?.message || 'Image uploaded successfully', {
        variant: 'success',
      });
    },
    onError: (err: IError) => {
      enqueueSnackbar(err.message || 'Error uploding image', {
        variant: 'error',
      });
    },
  });
};
