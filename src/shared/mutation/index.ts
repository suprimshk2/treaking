import { useMutation } from '@tanstack/react-query';
import { ICloudFile } from 'features/product/interfaces';
import * as productAPI from './api';

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: (file: ICloudFile) => productAPI.uploadImage(file),
  });
};
