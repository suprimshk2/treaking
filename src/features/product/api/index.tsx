import { IResponse } from 'shared/interfaces/http';
import { baseRequest } from 'shared/utils/axios';

import apiRoute from '../constant/apiRoute';

export const getProducts = async (data: any) => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getAll,
    params: data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const addProduct = async (data: any): Promise<IResponse<any>> => {
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
export const editProduct = async (
  id: string,
  data: any
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
export const getProductById = async (id: string): Promise<IResponse<any>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getOne.replace(':id', id),
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const deleteProduct = async (
  productId: string
): Promise<IResponse<{ isDeleted: boolean; productId: string }>> => {
  const { response, error } = await baseRequest({
    method: 'DELETE',
    url: apiRoute.delete.replace(':id', productId),
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};
