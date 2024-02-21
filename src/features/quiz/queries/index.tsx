import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { IQuizTableFilter } from '../interfaces';
import * as quizAPI from '../api';
import { formatQuizList } from '../utils';

export const infiniteQuizKeys = {
  all: ['infinite-quiz'] as const,
  lists: () => [...infiniteQuizKeys.all, 'list'] as const,
  list: (filters: IQuizTableFilter) =>
    [...infiniteQuizKeys.lists(), { filters }] as const,
  details: () => [...infiniteQuizKeys.all, 'detail'] as const,
  detail: (id: number | string) => [...infiniteQuizKeys.details(), id] as const,
  autocomplete: (filters: IQuizTableFilter) =>
    [...infiniteQuizKeys.lists(), 'autocomplete', { filters }] as const,
};
export const infiniteCampaignKeys = {
  all: ['infinite-campaign'] as const,
  lists: () => [...infiniteCampaignKeys.all, 'list'] as const,
  list: (filters: IQuizTableFilter) =>
    [...infiniteCampaignKeys.lists(), { filters }] as const,
  details: () => [...infiniteCampaignKeys.all, 'detail'] as const,
  detail: (id: number | string) =>
    [...infiniteCampaignKeys.details(), id] as const,
  autocomplete: (filters: IQuizTableFilter) =>
    [...infiniteCampaignKeys.lists(), 'autocomplete', { filters }] as const,
};
export const infiniteParticipantsKeys = {
  all: ['infinite-Participants'] as const,
  lists: () => [...infiniteParticipantsKeys.all, 'list'] as const,
  list: (filters: IQuizTableFilter) =>
    [...infiniteParticipantsKeys.lists(), { filters }] as const,
  details: () => [...infiniteParticipantsKeys.all, 'detail'] as const,
  detail: (id: number | string) =>
    [...infiniteParticipantsKeys.details(), id] as const,
  autocomplete: (filters: IQuizTableFilter) =>
    [...infiniteParticipantsKeys.lists(), 'autocomplete', { filters }] as const,
};
export const infiniteWinnerKeys = {
  all: ['infinite-Winner'] as const,
  lists: () => [...infiniteWinnerKeys.all, 'list'] as const,
  list: (filters: IQuizTableFilter) =>
    [...infiniteWinnerKeys.lists(), { filters }] as const,
  details: () => [...infiniteWinnerKeys.all, 'detail'] as const,
  detail: (id: number | string) =>
    [...infiniteWinnerKeys.details(), id] as const,
  autocomplete: (filters: IQuizTableFilter) =>
    [...infiniteWinnerKeys.lists(), 'autocomplete', { filters }] as const,
};
export const useInfiniteQuizQuery = (filters: IQuizTableFilter) => {
  return useInfiniteQuery({
    select: formatQuizList,
    queryKey: infiniteQuizKeys.list(filters),
    initialPageParam: 1,

    queryFn: ({ pageParam = 1 }: { pageParam: number | any }) =>
      quizAPI.getInfiniteQuiz({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
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
export const useCampaignQuery = (
  filters: IQuizTableFilter,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteCampaignKeys.autocomplete(filters),
    queryFn: () => quizAPI.getAllCampaign(filters),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo?.data?.rows,
  };
};
export const useGameParticipantsQuery = (
  gameId: string,
  filters: IQuizTableFilter,
  { enabled }: { enabled: boolean }
) => {
  const queryInfo = useQuery({
    queryKey: infiniteParticipantsKeys.autocomplete(filters),
    queryFn: () => quizAPI.getParticipants(gameId, filters),
    enabled,
  });

  return {
    ...queryInfo,
    data: queryInfo?.data?.rows,
  };
};
