import { useBoundStore } from 'shared/stores/useBoundStore';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import * as roleAPI from '../api';
import { IRoleTableFilter } from '../interfaces';

export const infiniteRoleKeys = {
  all: ['infinite-roles'] as const,
  lists: () => [...infiniteRoleKeys.all, 'list'] as const,
  list: (filters: IRoleTableFilter) =>
    [...infiniteRoleKeys.lists(), { filters }] as const,
  details: () => [...infiniteRoleKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...infiniteRoleKeys.details(), id] as const,
  autocomplete: (filters: IRoleTableFilter) =>
    [...infiniteRoleKeys.lists(), 'autocomplete', { filters }] as const,
};

export const useRolesQuery = (
  filters: IRoleTableFilter,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteRoleKeys.autocomplete(filters),
    queryFn: () => roleAPI.getRoles(filters),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};

export const useRoleQuery = (
  filters: IRoleTableFilter,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteRoleKeys.list(filters),
    queryFn: () => roleAPI.getInfiniteRoles(filters),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};

export const useInfiniteRolesQuery = (filters: IRoleTableFilter) => {
  const { totalRoles } = useBoundStore.getState();

  return useInfiniteQuery({
    queryKey: infiniteRoleKeys.list(filters),
    queryFn: ({ pageParam = 1 }) =>
      roleAPI.getInfiniteRoles({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.metaInfo.currentPage === lastPage.metaInfo.totalPage
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
    gcTime: 0,
  });
};

export const useRoleDetailQuery = (
  id: string,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteRoleKeys.detail(id),
    queryFn: () => roleAPI.getRoleById(id),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data?.data,
  };
};

export const useUserRoleDetailQuery = (
  userId: string,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteRoleKeys.detail(userId),
    queryFn: () => roleAPI.getUserRoleByUserId(userId),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data?.data,
  };
};

export const useAssociatedPermissionsDetailQuery = (
  id: string,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteRoleKeys.detail(id),
    queryFn: () => roleAPI.getAssociatedPermissions(id),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data?.data,
  };
};

export const usePermissionsQuery = (
  filters: any,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteRoleKeys.autocomplete(filters),
    queryFn: () => roleAPI.getAllPermissions(filters),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};
