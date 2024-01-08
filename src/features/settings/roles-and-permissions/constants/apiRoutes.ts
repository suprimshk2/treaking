const apiRoute = {
  add: '/roles',
  delete: '/roles/:id',
  edit: '/roles/:id',
  getAll: '/roles',
  getOne: '/roles/:id',
  getOneForUser: '/users/:id/permissions',
  getAllResource: '/resources',
  getOneResource: '/resources/:id',
  getAssociatedPermissions: '/roles/associate-permission/:id',
  assignPermissionToRoles: '/roles/assign-permission/:id',
  assignPermissionToUserRoles: '/users/:id/assign-resources',
};

export default apiRoute;
