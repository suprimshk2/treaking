const apiRoute = {
  add: '/users',
  addRole: '/users/:id/assign-roles',
  delete: '/users/:id',
  edit: '/users/:id',
  getAll: '/users',
  getOne: '/users/:id',
  getAutoCompleteUsers: '/users/active',
  changePassword: '/users/change-password',
  sendInvite: '/users/send-invite',
};

export default apiRoute;
