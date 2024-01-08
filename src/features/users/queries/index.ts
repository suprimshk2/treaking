import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import * as userAPI from '../api';
import { IUserTableFilter } from '../interfaces';

export const infiniteUserKeys = {
  all: ['infinite-users'] as const,
  lists: () => [...infiniteUserKeys.all, 'list'] as const,
  list: (filters: IUserTableFilter) =>
    [...infiniteUserKeys.lists(), { filters }] as const,
  details: () => [...infiniteUserKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...infiniteUserKeys.details(), id] as const,
  autocomplete: (filters: IUserTableFilter) =>
    [...infiniteUserKeys.lists(), 'autocomplete', { filters }] as const,
};

export const useUserQuery = (
  filters: IUserTableFilter,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteUserKeys.autocomplete(filters),
    queryFn: () => userAPI.getUsers(filters),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};

// Uses `useInfiniteQuery` hook for infinite scrolling (load more scrolling)
export const useInfiniteUsersQuery = (filters: IUserTableFilter) => {
  // const { totalUsers } = useBoundStore.getState();
  // const totalPages = Math.ceil(totalUsers / filters.limit);

  return useInfiniteQuery({
    queryKey: infiniteUserKeys.list(filters),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      userAPI.getInfiniteUsers({ ...filters, page: pageParam }),
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

export const useUserDetailQuery = (
  id: string,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteUserKeys.detail(id),
    queryFn: () => userAPI.getUserById(id),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data?.data,
  };
};
