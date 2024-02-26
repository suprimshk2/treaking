const apiRoute = {
  add: '/main/vendors',
  delete: '/main/vendors/:id',
  edit: '/main/vendors/:id',
  getAll: '/main/vendors?limit=1000',
  getOne: '/main/vendors/:id',
  getAutoCompleteVendor: '/main/vendors/active',
};

export default apiRoute;
