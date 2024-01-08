import { config } from 'shared/constants/config';

export const roleConfig = {
  ROLES_TABLE_DEFAULT_FILTER: {
    ...config.TABLE_DEFAULT_FILTER,
  },

  ROLES_TABLE_FILTER_MAP: {
    name: 'name',
    permission: 'permission',
  },
};
