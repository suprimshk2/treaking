import apiRoute from 'features/product/constant/apiRoute';
import { IFileSchema } from 'features/product/interfaces';
import { baseRequest } from 'shared/utils/axios';

export const uploadImage = async (data: IFileSchema) => {
  const bodyFormData = new FormData();
  bodyFormData.append('file', data);

  const { response, error } = await baseRequest({
    method: 'POST',
    url: apiRoute.image.create,
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};
