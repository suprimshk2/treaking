import { IVendorTableFilter } from '../interfaces';

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
