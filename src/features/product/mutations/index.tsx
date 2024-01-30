import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { infiniteProductKeys } from '../queries';
import * as productAPI from '../api';
import { IAdaptedproductSchema } from '../interfaces';

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
          return {
            ...old,
            data: {
              ...old.data,
              count: old.data.count + 1,
              rows: [res.data, ...old.data.rows],
            },
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
          return {
            ...old,
            data: {
              ...old.data,
              count: old.data.count + 1,
              rows: [res.data, ...old.data.rows],
            },
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
      enqueueSnackbar(res.message || 'Product added successfully', {
        variant: 'success',
      });

      queryClient.setQueryData(
        infiniteProductKeys.list(filters),
        (old: any) => {
          return {
            ...old,
            data: {
              ...old.data,
              count: old.data.count + 1,
              rows: old.data.rows.filter(
                (item) => item.productId !== res.data?.productId
              ),
            },
          };
        }
      );
    },
  });
};

