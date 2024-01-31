import { useInfiniteQuery } from '@tanstack/react-query';
import { IListResponse, IResponse } from 'shared/interfaces/http';
import { IAdoptQuiz, IQuizTableFilter } from '../interfaces';
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
export const useInfiniteQuizQuery = (filters: IQuizTableFilter) => {
  // const { totalUsers } = useBoundStore.getState();
  // const totalPages = Math.ceil(totalUsers / filters.limit);

  return useInfiniteQuery({
    select: formatQuizList,
    queryKey: infiniteQuizKeys.list(filters),
    initialPageParam: 1,

    queryFn: ({ pageParam = 1 }) =>
      quizAPI.getInfiniteQuiz({ ...filters, page: pageParam }),
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
