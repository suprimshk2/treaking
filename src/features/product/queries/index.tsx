import { IProductTableFilter } from '../interfaces';

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
