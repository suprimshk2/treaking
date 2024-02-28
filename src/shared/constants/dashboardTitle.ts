import uiRoute from './uiRoute';

export const TITLE_TYPE = {
  ROLES_PERMISSION: uiRoute.rolePermissionManagement.index,
  USER_MANAGEMENT: uiRoute.userManagement,
  DASHBOARD: uiRoute.dashboard,
  QUIZ: uiRoute.quiz,
  VENDOR: uiRoute.vendor,
  PRODUCT: uiRoute.products,
  OFFER: uiRoute.offers?.index,
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
  [TITLE_TYPE.OFFER]: {
    title: 'Offer Management',
  },
  [TITLE_TYPE.VENDOR]: {
    title: 'Vendor Management',
  },
  [TITLE_TYPE.QUIZ]: {
    title: 'Quiz Management',
  },
  [TITLE_TYPE.PRODUCT]: {
    title: 'Product Management',
  },
  [TITLE_TYPE.EMPTY]: {
    title: '',
  },
};
