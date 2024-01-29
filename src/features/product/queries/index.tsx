import { useQuery } from '@tanstack/react-query';
import { IProductTableFilter } from '../interfaces';
import * as productAPI from '../api';
import { adaptProductList } from '../utils';

export const infiniteProductKeys = {
  all: ['infinite-Product'] as const,
  lists: () => [...infiniteProductKeys.all, 'list'] as const,
  list: (filters: IProductTableFilter) =>
    [...infiniteProductKeys.lists(), { filters }] as const,
  details: () => [...infiniteProductKeys.all, 'detail'] as const,
  detail: (id: number | string) =>
    [...infiniteProductKeys.details(), id] as const,
  autocomplete: (filters: IProductTableFilter) =>
    [...infiniteProductKeys.lists(), 'autocomplete', { filters }] as const,
};

export const useProductsQuery = (
  filters: IProductTableFilter,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteProductKeys.list(filters),
    queryFn: () => productAPI.getProducts(filters),
    enabled,
    select: adaptProductList,
  });

  return {
    ...queryInfo,
    data: queryInfo.data?.data,
  };
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
