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
