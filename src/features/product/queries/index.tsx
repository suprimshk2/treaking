import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
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
  const queryInfo = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: infiniteProductKeys.list(filters),
    queryFn: () => productAPI.getProducts(filters),
    enabled,
    getNextPageParam: (lastPage) => {
      const { metaInfo } = lastPage.data;
      if (metaInfo?.totalPage === 0) return undefined;
      const nextPage =
        metaInfo?.currentPage === metaInfo?.totalPage
          ? undefined
          : metaInfo.currentPage + 1;
      return nextPage;
    },
    select: adaptProductList,
    gcTime: 0,
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
