import { InfiniteData, useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { formatSortParam } from 'shared/utils/misc';
import { queryClient } from 'App';
import { IListResponse } from 'shared/interfaces/http';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { infiniteVendorKeys } from '../queries';
import * as vendorAPI from '../api';
import { IFormattedVendorFormSchema } from '../interfaces';

export const useAddVendorMutation = () => {
  const filters = useBoundStore.getState().vendorTableFilters;
  const { sortBy, sortOrder } = useBoundStore.getState().vendorSort;

  return useMutation({
    mutationFn: ({ data }: { data: IFormattedVendorFormSchema }) =>
      vendorAPI.addVendor(data),
    onSuccess: (res) => {
      console.log(res, 'logg ress');

      enqueueSnackbar(res.message || 'Vendor added successfully', {
        variant: 'success',
      });

      const queryKey = infiniteVendorKeys.list({
        ...filters,
        ...formatSortParam({
          sortBy,
          sortOrder,
        }),
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
export const useVendorDetailQuery = (
  id: string,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteVendorKeys.detail(id),
    queryFn: () => vendorAPI.getVendorById(id),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data?.data,
  };
};
