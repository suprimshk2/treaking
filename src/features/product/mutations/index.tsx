import { InfiniteData, useMutation, useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { formatSortParam } from 'shared/utils/misc';
import { queryClient } from 'App';
import { IListResponse } from 'shared/interfaces/http';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { IRoleTableFilter } from 'features/settings/roles-and-permissions/interfaces';
import { infiniteProductKeys } from '../queries';
import * as productAPI from '../api';
import * as vendorAPI from '../../vendor/api';
import { IAdaptedproductSchema } from '../interfaces';

export const useAddProductMutation = () => {
  const filters = useBoundStore.getState().productTableFilters;
  const { sortBy, sortOrder } = useBoundStore.getState().productSort;

  return useMutation({
    mutationFn: ({ data }: { data: IAdaptedproductSchema }) =>
      productAPI.addProduct(data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Product added successfully', {
        variant: 'success',
      });

      const queryKey = infiniteProductKeys.list({
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
export const useProductDetailQuery = (
  id: string,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteProductKeys.detail(id),
    queryFn: () => productAPI.getProductById(id),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data?.data,
  };
};

export const useVendorsQuery = (filters: IRoleTableFilter) => {
  const queryInfo = useQuery({
    queryKey: infiniteProductKeys.autocomplete(filters),
    queryFn: () => vendorAPI.getVendor(),
  });

  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};
