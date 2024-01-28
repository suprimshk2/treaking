const apiRoute = {
  add: '/main/products',
  delete: '/vendor/:id',
  edit: '/vendor/:id',
  getAll: '/main/products',
  getOne: '/vendor/:id',
  getAutoCompleteVendor: '/vendor/active',
  image: { create: '/main/cloud-files' },
};

export default apiRoute;
