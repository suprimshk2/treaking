import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { IError, IListResponse } from 'shared/interfaces/http';
import { IAddRoleSchema, IEditRoleSchema, IRole } from '../interfaces';
import * as roleAPI from '../api';
import { infiniteRoleKeys } from '../queries';

export const useAddRoleMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const filters = useBoundStore.getState().roleTableFilters;

  const { totalRoles, setTotalRoles } = useBoundStore.getState();

  return useMutation({
    mutationFn: ({ data }: { data: IAddRoleSchema }) => roleAPI.addRole(data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Role added successfully', {
        variant: 'success',
      });

      const queryKey = infiniteRoleKeys.list({
        ...filters,
      });

      const queryData: InfiniteData<IListResponse<IRole>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      queryData.pages[0].rows.unshift(res.data);

      queryClient.setQueryData<InfiniteData<IListResponse<IRole>>>(
        queryKey,
        (data) => ({
          pages: queryData.pages,
          pageParams: data?.pageParams || [],
        })
      );

      // Update the total users in the store
      setTotalRoles(totalRoles + 1);
    },
  });
};

export const useEditRoleMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const filters = useBoundStore.getState().roleTableFilters;

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IEditRoleSchema }) =>
      roleAPI.editRole(id, data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Role edited successfully', {
        variant: 'success',
      });

      const queryKey = infiniteRoleKeys.list({
        ...filters,
      });

      const queryData: InfiniteData<IListResponse<IRole>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      queryData.pages.find((page) => {
        const exist = page.rows.findIndex(
          (item: IRole) => item._id === res.data._id
        );

        if (exist >= 0) {
          // eslint-disable-next-line no-param-reassign
          page.rows[exist] = res.data;
          return exist;
        }
        return false;
      });

      queryClient.setQueryData<InfiniteData<IListResponse<IRole>>>(
        queryKey,
        (data) => ({
          pages: queryData.pages,
          pageParams: data?.pageParams || [],
        })
      );
    },
  });
};

export const useDeleteRoleMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const filters = useBoundStore.getState().roleTableFilters;

  return useMutation({
    mutationFn: ({ id }: { id: string }) => roleAPI.deleteRole(id),

    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Role deleted successfully', {
        variant: 'success',
      });

      const queryKey = infiniteRoleKeys.list({
        ...filters,
      });

      const queryData: InfiniteData<IListResponse<IRole>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      queryClient.invalidateQueries({ queryKey });
    },
    onError: (err: IError) => {
      enqueueSnackbar(err.message || 'Error deleting role', {
        variant: 'error',
      });
    },
  });
};

export const useAssignPermissionsToRoleMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      roleAPI.assignPermissionsToRoles(id, data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Permissions Assigned Successfully', {
        variant: 'success',
      });
    },
  });
};

export const useAssignPermissionsToUserRoleMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      roleAPI.assignPermissionsToUserRoles(id, data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Permissions Assigned Successfully', {
        variant: 'success',
      });
    },
  });
};
