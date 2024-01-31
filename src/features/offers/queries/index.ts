import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import * as offerAPI from '../api';
import { IOfferTableFilter } from '../interfaces';

export const infiniteOfferKeys = {
  all: ['infinite-offers'] as const,
  lists: () => [...infiniteOfferKeys.all, 'list'] as const,
  list: (filters: IOfferTableFilter) =>
    [...infiniteOfferKeys.lists(), { filters }] as const,
  details: () => [...infiniteOfferKeys.all, 'detail'] as const,
  detail: (id: number | string) =>
    [...infiniteOfferKeys.details(), id] as const,
};

// Uses `useInfiniteQuery` hook for infinite scrolling (load more scrolling)
export const useInfiniteOffersQuery = (filters: IOfferTableFilter) => {
  // const { totalOffers } = useBoundStore.getState();
  // const totalPages = Math.ceil(totalOffers / filters.limit);

  return useInfiniteQuery({
    queryKey: infiniteOfferKeys.list(filters),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      offerAPI.getInfiniteOffers({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage?.total === 0) return undefined;
      const nextPage =
        lastPage?.metaInfo?.currentPage === lastPage?.metaInfo?.totalPage
          ? undefined
          : lastPage.metaInfo.currentPage + 1;
      // setOfferTableFilters({ page: nextPage || 1 });

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

export const useOfferDetailQuery = (
  id: string,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteOfferKeys.detail(id),
    queryFn: () => offerAPI.getOfferById(id),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data?.data,
  };
};
