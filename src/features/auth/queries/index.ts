import { useQuery } from '@tanstack/react-query';
import { useBoundStore } from 'shared/stores/useBoundStore';
import * as authAPI from '../api';
import { sortPermissionByOrder } from '../utils';

export const authorizationKeys = {
  all: ['authorization-keys'] as const,
  lists: () => [...authorizationKeys.all, 'list'] as const,
  list: (filters: any) => [...authorizationKeys.lists(), { filters }] as const,
  details: () => [...authorizationKeys.all, 'detail'] as const,
  detail: (id: number | string) =>
    [...authorizationKeys.details(), id] as const,
  autocomplete: (filters: any) =>
    [...authorizationKeys.lists(), 'autocomplete', { filters }] as const,
};

export const useAuthorizationQuery = (
  { enabled }: { enabled: boolean },
  filters?: any
) => {
  const queryInfo = useQuery({
    queryKey: authorizationKeys.autocomplete(filters),
    queryFn: () => authAPI.authorizationPermissions(),
    enabled,
    select: sortPermissionByOrder,
  });
  const setAuthModules = useBoundStore.getState().setAuthModule;
  setAuthModules(queryInfo.data?.data || []);
  return {
    ...queryInfo,
    data: queryInfo.data,
  };
};
