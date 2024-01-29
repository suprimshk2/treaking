import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { IVendorTableFilter } from '../interfaces';
import * as vendorApi from '../api';

export const infiniteVendorKeys = {
  all: ['infinite-vendor'] as const,
  lists: () => [...infiniteVendorKeys.all, 'list'] as const,
  list: (filters: IVendorTableFilter) =>
    [...infiniteVendorKeys.lists(), { filters }] as const,
  details: () => [...infiniteVendorKeys.all, 'detail'] as const,
  detail: (id: number | string) =>
    [...infiniteVendorKeys.details(), id] as const,
  autocomplete: (filters: IVendorTableFilter) =>
    [...infiniteVendorKeys.lists(), 'autocomplete', { filters }] as const,
};

export const vendorKeys = {
  all: ['vendor'] as const,
  lists: () => [...vendorKeys.all, 'list'] as const,
  list: (filters: IVendorTableFilter) =>
    [...vendorKeys.lists(), { filters }] as const,
};

export const useInfiniteVendorQuery = (filters: IVendorTableFilter) => {
  // const { totalUsers } = useBoundStore.getState();
  // const totalPages = Math.ceil(totalUsers / filters.limit);

  return useInfiniteQuery({
    queryKey: infiniteVendorKeys.list(filters),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      vendorApi.getInfiniteVendor({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.total === 0) return undefined;
      const nextPage =
        lastPage?.metaInfo?.currentPage === lastPage?.metaInfo?.totalPage
          ? undefined
          : lastPage.metaInfo.currentPage + 1;
      // setUserTableFilters({ page: nextPage || 1 });

      // Commenting as this may be needed in the future
      // const nextPage =
      //   lastPage.length === filters.limit && allPages.length < totalPages
      //     ? allPages.length * filters.limit
      //     : undefined;

      return nextPage;
    },
    // CacheTime set to zero because of a bug encountered.
    // Bug: The `hasNextPage` parameter returned from `useInfiniteQuery` is not updated unlike `data` when taken from cache.
    // Suppose, the original data returned -> pages: [[], [], []], hasNextPage: true
    // and then, you search 'sth' -> pages: [[]], hasNextPage: false
    // and when you clear the search field, the data is taken from cache but `hasNextPage` stays the same -> pages: [[], [], []], hasNextPage: false
    // cacheTime: 0,
    gcTime: 0,
  });
};

export const useVendorQuery = (filters: IVendorTableFilter) => {
  return useQuery({
    queryKey: vendorKeys.list(filters),
    queryFn: () => vendorApi.getVendor(),
  });
};
