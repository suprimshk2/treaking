const uiRoute = {
  index: '/',
  auth: {
    activateAccount: 'activate-account',
    login: '/login',
    logout: '/logout',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  },
  settings: {
    userManagement: '/settings/user-management',
    rolePermissionManagement: {
      index: '/settings/roles-permission-management',
      manageRolesAndPermissions:
        '/settings/roles-permission-management/manage-roles-and-permissions',
    },
  },
  home: '/home',
  users: '/users',
  dashboard: '/dashboard',
  profile: {
    profile: '/profile',
    profileSecurity: '/profile/security',
  },
};

export default uiRoute;
