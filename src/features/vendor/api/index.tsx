import { IResponse } from 'shared/interfaces/http';
import { baseRequest } from 'shared/utils/axios';

import { IAddQuizSchema, IFormattedQuizFormSchema } from '../interfaces';
import apiRoute from '../constant/apiRoute';

export const addVendor = async (
  data: IFormattedQuizFormSchema
): Promise<IResponse<any>> => {
  const { response, error } = await baseRequest({
    method: 'POST',
    url: apiRoute.add,
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};
export const editVendor = async (
  id: string,
  data: IAddQuizSchema
): Promise<IResponse<any>> => {
  const { response, error } = await baseRequest({
    method: 'PUT',
    url: apiRoute.edit.replace(':id', id),
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};
export const getVendorById = async (
  id: string
): Promise<IResponse<IAddQuizSchema>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getOne.replace(':id', id),
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const deleteVendor = async (
  id: string
): Promise<IResponse<{ isDeleted: boolean }>> => {
  const { response, error } = await baseRequest({
    method: 'DELETE',
    url: apiRoute.delete.replace(':id', id),
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};
