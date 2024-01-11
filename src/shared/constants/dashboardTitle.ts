import uiRoute from './uiRoute';

export const TITLE_TYPE = {
  ROLES_PERMISSION: uiRoute.settings.rolePermissionManagement.index,
  USER_MANAGEMENT: uiRoute.settings.userManagement,
  DASHBOARD: uiRoute.dashboard,
  EMPTY: '',
};
export const HEADER_TITLE = {
  [TITLE_TYPE.ROLES_PERMISSION]: {
    title: 'Roles and Permission',
  },
  [TITLE_TYPE.USER_MANAGEMENT]: {
    title: 'User Management',
  },
  [TITLE_TYPE.DASHBOARD]: {
    title: 'Dashboard',
  },
  [TITLE_TYPE.EMPTY]: {
    title: '',
  },
};
