import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { IError, IListResponse } from 'shared/interfaces/http';
import { useBoundStore } from 'shared/stores/useBoundStore';

import { formatSortParam } from 'shared/utils/misc';

import * as userAPI from '../api';
import {
  IAddUserSchema,
  IEditUserSchema,
  ISendInviteSchema,
  IUser,
  IUserPasswordChangeSchema,
} from '../interfaces';
import { infiniteUserKeys } from '../queries';

export const useAddUserMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const filters = useBoundStore.getState().userTableFilters;
  const { sortBy, sortOrder } = useBoundStore.getState().userSort;
  const { totalUsers, setTotalUsers } = useBoundStore.getState();
  let roles = {};
  return useMutation({
    mutationFn: ({ data }: { data: any }) => {
      roles = data?.association;

      return userAPI.addUser(data);
    },
    onSuccess: async (res) => {
      await userAPI.addRole(roles, res?.data?._id);

      enqueueSnackbar(res.message || 'User added successfully', {
        variant: 'success',
      });

      const queryKey = infiniteUserKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
      });
      const queryData: InfiniteData<IListResponse<IUser>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }
      queryData.pages[0].rows.unshift(res.data);
      const newPagesArray = [...queryData.pages];

      // // add the newly created user to the list
      // // const newPagesArray = [
      // //   [res.data, ...queryData.pages[0].rows],
      // //   ...queryData.pages.slice(1),
      // // ];

      queryClient.setQueryData<InfiniteData<IListResponse<IUser>>>(
        queryKey,
        (data) => ({
          pages: newPagesArray,
          pageParams: data?.pageParams || [],
        })
      );
      queryClient.invalidateQueries({ queryKey });

      // Update the total users in the store
      setTotalUsers(totalUsers + 1);
    },
  });
};

export const useEditUserMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const { sortBy, sortOrder } = useBoundStore.getState().userSort;
  const filters = useBoundStore.getState().userTableFilters;

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IEditUserSchema }) =>
      userAPI.editUser(id, data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'User edited successfully', {
        variant: 'success',
      });

      const queryKey = infiniteUserKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
      });

      const queryData: InfiniteData<IListResponse<IUser>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      // Update the user in the list with updated data

      queryData.pages.find((page) => {
        const exist = page.rows.findIndex(
          (item: IUser) => item._id === res.data._id
        );
        if (exist >= 0) {
          // eslint-disable-next-line no-param-reassign
          page.rows[exist] = res.data;
          return exist;
        }
        return false;
        // return {
        //   ...page,
        //   rows: page.rows.map((item: IUser) => {
        //     if (item._id !== res.data._id) return item;
        //     return res.data;
        //   }),
        // };
      });

      queryClient.setQueryData<InfiniteData<IListResponse<IUser>>>(
        queryKey,
        (data) => ({
          pages: queryData.pages,
          pageParams: data?.pageParams || [],
        })
      );
    },
  });
};

export const useDeleteUserMutation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const filters = useBoundStore.getState().userTableFilters;
  // const { totalUsers, setTotalUsers } = useBoundStore.getState();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => userAPI.deleteUser(id),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'User deleted successfully', {
        variant: 'success',
      });
      const { sortBy, sortOrder } = useBoundStore.getState().userSort;
      const queryKey = infiniteUserKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
      });

      const queryData: InfiniteData<IUser[]> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      // Invalidated the query instead of manual update because removing a item from the pages interferes with
      // how `hasNextPage` is calculated.
      queryClient.invalidateQueries({ queryKey });

      // However, if you want to do a manual update you can do it like this (shown below)
      // ------------
      // Remove the deleted user from the list
      // const newPagesArray =
      //   queryData.pages.map((page) =>
      //     page.filter((user) => user._id !== context.id)  // context can be taken from arg like onSuccess: (res, context) => {}
      //   ) ?? [];

      // queryClient.setQueryData<InfiniteData<IUser[]>>(queryKey, (data) => ({
      //   pages: newPagesArray,
      //   pageParams: data?.pageParams || [],
      // }));

      // Update the total users in the store
      // setTotalUsers(totalUsers - 1);
    },
    onError: (err: IError) => {
      enqueueSnackbar(err.message || 'Error deleting user', {
        variant: 'error',
      });
    },
  });
};

export const useUserPasswordChangeMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ data }: { data: IUserPasswordChangeSchema }) =>
      userAPI.changePassword(data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message, {
        variant: 'success',
      });
    },
  });
};

export const useSendInviteMutation = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ data }: { data: ISendInviteSchema }) =>
      userAPI.sendInvite(data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message, {
        variant: 'success',
      });
    },
  });
};
