import uiRoute from './uiRoute';

export const SETTINGS_BAR_PROPERTY = {
  SIDEBAR_WIDTH: '100px',
  DRAWER_WIDTH: '246px',
  HEADER_HEIGHT: '64px',
  ASIDE_BAR_WIDTH: '46px',
};

export const settingsRoutes = [
  {
    name: 'User Management',
    route: uiRoute.settings.userManagement,
  },

  {
    name: 'Roles & Permission',
    route: uiRoute.settings.rolePermissionManagement.index,
  },
];
