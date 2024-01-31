import { IListResponse, IResponse } from 'shared/interfaces/http';
import { baseRequest } from 'shared/utils/axios';

import { useBoundStore } from 'shared/stores/useBoundStore';
import {
  IAddQuizSchema,
  IFormattedQuizFormSchema,
  IQuizTableFilter,
} from '../interfaces';
import apiRoute from '../constant/apiRoute';
import { formatQuizFilterParams } from '../utils';

export const getInfiniteQuiz = async (
  filters: IQuizTableFilter
): Promise<IListResponse<any>> => {
  const params = formatQuizFilterParams(filters);

  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getAll,
    params,
  });

  if (error) {
    return Promise.reject(error);
  }

  /**
   * Set the total count (of users)
   *
   * Why use store and not take directly from queryData?
   * - cuz the `useInfiniteQuery` hook is designed to provide a paginated response
   * for infinite scrolling, so it returns only the data for the current page and the next page.
   * The total count is lost as only the list of data are returned from the API function (see src/features/users/api/index -> getInfiniteUsers())
   */
  const setTotal = useBoundStore.getState().setTotalUsers;
  setTotal(response.data?.data?.count || response.data?.data?.total || 0);

  return response?.data?.data;
};
export const addQuiz = async (
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
export const editQuiz = async (
  id: string,
  data: IFormattedQuizFormSchema
): Promise<IResponse<any>> => {
  const { response, error } = await baseRequest({
    method: 'PATCH',
    url: apiRoute.edit.replace(':id', id),
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};
export const getQuizById = async (
  id: string
): Promise<IResponse<IFormattedQuizFormSchema>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getOne.replace(':id', id),
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const deleteQuiz = async (
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
