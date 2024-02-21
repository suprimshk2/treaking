import { InfiniteData, useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { formatSortParam } from 'shared/utils/misc';
import { queryClient } from 'App';
import { IError, IListResponse } from 'shared/interfaces/http';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { infiniteVendorKeys } from '../queries';
import * as vendorAPI from '../api';
import { IFormattedVendorFormSchema, IVendor } from '../interfaces';
import { formatVendorDetail } from '../utils';

export const useAddVendorMutation = () => {
  const filters = useBoundStore.getState().vendorTableFilters;
  const { sortBy, sortOrder } = useBoundStore.getState().vendorSort;

  return useMutation({
    onError: (error: IError) => {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    },
    mutationFn: ({ data }: { data: IFormattedVendorFormSchema }) =>
      vendorAPI.addVendor(data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Vendor added successfully', {
        variant: 'success',
      });

      const queryKey = infiniteVendorKeys.list({
        ...filters,
        // ...formatSortParam({
        //   sortBy,
        //   sortOrder,
        // }),
      });
      const queryData: InfiniteData<IListResponse<any>> | undefined =
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

      queryClient.setQueryData<InfiniteData<IListResponse<any>>>(
        queryKey,
        (data) => ({
          pages: newPagesArray,
          pageParams: data?.pageParams || [],
        })
      );

      // Update the total users in the store
      // setTotalUsers(totalUsers + 1);
    },
  });
};
export const useEditVendorMutation = () => {
  const { sortBy, sortOrder } = useBoundStore.getState().vendorSort;
  const filters = useBoundStore.getState().vendorTableFilters;

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IVendor }) =>
      vendorAPI.editVendor(id, data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Vendor edited successfully', {
        variant: 'success',
      });

      const queryKey = infiniteVendorKeys.list({
        ...filters,
        // ...formatSortParam({
        //   sortBy,
        //   sortOrder,
        // }),
      });

      const queryData: InfiniteData<IListResponse<IVendor>> | undefined =
        queryClient.getQueryData(queryKey);

      if (!queryData) {
        return;
      }

      // Update the user in the list with updated data

      queryData.pages.find((page) => {
        const exist = page.rows.findIndex(
          (item: IVendor) => item._id === res.data._id
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

      queryClient.setQueryData<InfiniteData<IListResponse<IVendor>>>(
        queryKey,
        (data) => ({
          pages: queryData.pages,
          pageParams: data?.pageParams || [],
        })
      );
    },
  });
};

export const useVendorDetailQuery = (
  id: string,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    select: formatVendorDetail,
    queryKey: infiniteVendorKeys.detail(id),
    queryFn: () => vendorAPI.getVendorById(id),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo?.data,
  };
};

export const useDeleteVendorMutation = () => {
  const filters = useBoundStore.getState().vendorTableFilters;

  return useMutation({
    mutationFn: ({ id }: { id: string }) => vendorAPI.deleteVendor(id),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Vendor deleted successfully', {
        variant: 'success',
      });
      const { sortBy, sortOrder } = useBoundStore.getState().userSort;
      const queryKey = infiniteVendorKeys.list({
        ...filters,
        // ...formatSortParam({
        //   sortBy,
        //   sortOrder,
        // }),
      });

      const queryData: InfiniteData<any[]> | undefined =
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
