const uiRoute = {
  index: '/',
  auth: {
    activateAccount: 'activate-account',
    login: '/login',
    logout: '/logout',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  },
  // settings: {
  userManagement: '/user-management',
  rolePermissionManagement: {
    index: '/roles-permission-management',
    manageRolesAndPermissions:
      '/roles-permission-management/manage-roles-and-permissions',
    // },
  },
  offers: {
    index: '/offers',
    offerForm: '/offers-form',
  },
  home: '/home',
  users: '/users',
  dashboard: '/dashboard',
  addQuiz: '/add',
  profile: {
    profile: '/profile',
    profileSecurity: '/profile/security',
  },
  products: '/products',
  quiz: '/quiz',
  vendor: '/vendors',

  // quiz: { list: '/quiz', add: '/create' },
  vendors: { add: '/create' },
};

export default uiRoute;
