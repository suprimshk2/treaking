/* eslint-disable no-unsafe-optional-chaining */
import { baseRequest } from 'shared/utils/axios';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { IListResponse, IResponse } from 'shared/interfaces/http';
import {
  IAddRoleSchema,
  IEditRoleSchema,
  IRole,
  IRoleTableFilter,
} from '../interfaces';
import apiRoute from '../constants/apiRoutes';
import { formatRoleFilterParams } from '../utils';
import { RolesCode } from '../enums';

export const getRoles = async (filters: IRoleTableFilter): Promise<IRole[]> => {
  // const params = formatUserFilterParams(filters);

  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getAll,
    params: filters,
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
  const setTotal = useBoundStore.getState().setTotalRoles;
  setTotal(response.data?.data?.count || 0);

  return response?.data?.data?.rows;
};

export const getInfiniteRoles = async (
  filters: IRoleTableFilter
): Promise<IListResponse<IRole>> => {
  const params = formatRoleFilterParams(filters);

  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getAll,
    params,
  });

  if (error) {
    return Promise.reject(error);
  }

  const isSuperAdminIncluded = response?.data?.data?.rows?.find(
    (item: any) => item?.code === RolesCode.SUPER_ADMIN
  );

  const setTotal = useBoundStore.getState().setTotalRoles;
  setTotal(
    (isSuperAdminIncluded
      ? response.data?.data?.count - 1
      : response.data?.data?.count) ||
      (isSuperAdminIncluded
        ? response.data?.data?.total - 1
        : response.data?.data?.total) ||
      0
  );

  return response?.data?.data;
};

export const getAllPermissions = async (
  filters: any
): Promise<IListResponse<any>> => {
  const params = formatRoleFilterParams(filters);

  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getAllResource,
    params,
  });

  if (error) {
    return Promise.reject(error);
  }

  const setPermissions = useBoundStore.getState().setAllPermissions;
  setPermissions(response.data?.data || []);

  return response?.data?.data;
};

export const getRoleById = async (id: string): Promise<IResponse<IRole>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getOne.replace(':id', id),
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const getUserRoleByUserId = async (
  userId: string
): Promise<IResponse<any>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getOneForUser.replace(':id', userId),
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const getAssociatedPermissions = async (
  id: string
): Promise<IResponse<any>> => {
  const { response, error } = await baseRequest({
    method: 'GET',
    url: apiRoute.getAssociatedPermissions.replace(':id', id),
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const assignPermissionsToRoles = async (id: string, data: any) => {
  const { response, error } = await baseRequest({
    method: 'PUT',
    url: apiRoute.assignPermissionToRoles.replace(':id', id),
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const assignPermissionsToUserRoles = async (
  userId: string,
  data: any
) => {
  const { response, error } = await baseRequest({
    method: 'PUT',
    url: apiRoute.assignPermissionToUserRoles.replace(':id', userId),
    data,
  });

  if (error) {
    return Promise.reject(error);
  }

  return response?.data;
};

export const addRole = async (data: IAddRoleSchema) => {
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

export const editRole = async (
  id: string,
  data: IEditRoleSchema
): Promise<IResponse<IRole>> => {
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

export const deleteRole = async (
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
