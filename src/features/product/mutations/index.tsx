import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { infiniteProductKeys } from '../queries';
import * as productAPI from '../api';
import { IAdaptedproductSchema } from '../interfaces';
import { IError } from 'shared/interfaces/http';

export const useAddProductMutation = () => {
  const queryClient = useQueryClient();

  const filters = useBoundStore.getState().productTableFilters;

  return useMutation({
    mutationFn: ({ data }: { data: IAdaptedproductSchema }) =>
      productAPI.addProduct(data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Product added successfully', {
        variant: 'success',
      });

      queryClient.setQueryData(
        infiniteProductKeys.list(filters),
        (old: any) => {
          const { data } = old.pages[0];
          return {
            ...old,
            pages: [
              {
                data: {
                  ...data,
                  count: data.count + 1,
                  rows: [
                    {
                      ...res.data,
                      point: { originalValue: res.data.point[0].value },
                      price: { originalValue: res.data.price[0].value },
                    },
                    ...data.rows,
                  ],
                },
              },
            ],
          };
        }
      );
    },
  });
};

export const useEditProductMutation = () => {
  const queryClient = useQueryClient();

  const filters = useBoundStore.getState().productTableFilters;

  return useMutation({
    mutationFn: ({
      productId,
      data,
    }: {
      productId: string;
      data: IAdaptedproductSchema;
    }) => productAPI.editProduct(productId, data),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Product added successfully', {
        variant: 'success',
      });

      queryClient.setQueryData(
        infiniteProductKeys.list(filters),
        (old: any) => {
          const { data } = old.pages[0];
          return {
            ...old,
            pages: [
              {
                data: {
                  ...data,
                  count: data.count + 1,
                  rows: [
                    {
                      ...res.data,
                      point: { originalValue: res.data.point[0].value },
                      price: { originalValue: res.data.price[0].value },
                    },
                    ...data.rows.filter(
                      (item) => item.productId !== res.data.productId
                    ),
                  ],
                },
              },
            ],
          };
        }
      );
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  const filters = useBoundStore.getState().productTableFilters;

  return useMutation({
    mutationFn: (productId: string) => productAPI.deleteProduct(productId),
    onSuccess: (res) => {
      enqueueSnackbar(res.message || 'Product delete successfully', {
        variant: 'success',
      });

      const queryKey = infiniteProductKeys.list({
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
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (err: IError) => {
      enqueueSnackbar(err.message || 'Error deleting product', {
        variant: 'error',
      });
    },
  });
};
