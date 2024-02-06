import apiRoute from 'features/product/constant/apiRoute';
import { ICloudFile } from 'features/product/interfaces';
import { baseRequest } from 'shared/utils/axios';

export const uploadImage = async (data: ICloudFile | any) => {
  const bodyFormData = new FormData();
  bodyFormData.append('file', data.file);
  bodyFormData.append('category', data.category);

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
