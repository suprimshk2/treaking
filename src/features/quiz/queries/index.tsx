import { IQuizTableFilter } from '../interfaces';

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
