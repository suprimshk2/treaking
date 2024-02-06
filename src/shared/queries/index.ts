import { useQuery } from '@tanstack/react-query';
import { ILookupFilter } from 'shared/interfaces/misc';
import * as offerAPI from './api';

export const templeteKeys = {
  all: ['templete'] as const,
  templetes: () => [...templeteKeys.all, 'list'] as const,
  templete: (filters: ILookupFilter) =>
    [...templeteKeys.templetes(), { filters }] as const,
};

// Uses `useInfiniteQuery` hook for infinite scrolling (load more scrolling)
export const useLookUpQuery = (filters: ILookupFilter, enabled = true) => {
  // const { totalOffers } = useBoundStore.getState();
  // const totalPages = Math.ceil(totalOffers / filters.limit);
  return useQuery({
    queryKey: templeteKeys.templete(filters),
    queryFn: () => offerAPI.getData(filters),
    enabled,
    // CacheTime set to zero because of a bug encountered.
    // Bug: The `hasNextPage` parameter returned from `useInfiniteQuery` is not updated unlike `data` when taken from cache.
    // Suppose, the original data returned -> pages: [[], [], []], hasNextPage: true
    // and then, you search 'sth' -> pages: [[]], hasNextPage: false
    // and when you clear the search field, the data is taken from cache but `hasNextPage` stays the same -> pages: [[], [], []], hasNextPage: false
    // cacheTime: 0,
    gcTime: 0,
  });
};
