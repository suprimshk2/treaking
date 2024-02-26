import { IListResponse, IResponse } from 'shared/interfaces/http';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { baseRequest } from 'shared/utils/axios';
import apiRoute from '../constants/apiRoute';
import {
  IAddUserSchema,
  IEditUserSchema,
  ISendInviteSchema,
  IUser,
  IUserPasswordChangeSchema,
  IUserTableFilter,
} from '../interfaces';
import { formatUserFilterParams } from '../utils';

export const getUsers = async (filters: IUserTableFilter): Promise<IUser[]> => {
  const params = formatUserFilterParams(filters);

  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getAutoCompleteUsers,
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
  setTotal(response.data?.data?.count || 0);

  return response?.data?.data?.rows;
};

export const getInfiniteUsers = async (
  filters: IUserTableFilter
): Promise<IListResponse<IUser>> => {
  const params = formatUserFilterParams(filters);

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

export const getUserById = async (id: string): Promise<IResponse<IUser>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getOne.replace(':id', id),
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const addUser = async (
  data: IAddUserSchema
): Promise<IResponse<IUser>> => {
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
export const addRole = async (data, id): Promise<IResponse<IUser>> => {
  const { response, error } = await baseRequest({
    method: 'PUT',
    url: apiRoute.addRole.replace(':id', id),
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const editUser = async (
  id: string,
  data: IEditUserSchema
): Promise<IResponse<IUser>> => {
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

export const deleteUser = async (
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

export const changePassword = async (
  data: IUserPasswordChangeSchema
): Promise<IResponse<null>> => {
  const { response, error } = await baseRequest({
    method: 'PATCH',
    url: apiRoute.changePassword,
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const sendInvite = async (
  data: ISendInviteSchema
): Promise<IResponse<null>> => {
  const { response, error } = await baseRequest({
    method: 'POST',
    url: apiRoute.sendInvite,
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};
