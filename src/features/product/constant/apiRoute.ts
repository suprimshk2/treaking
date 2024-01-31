const apiRoute = {
  add: '/main/products',
  delete: '/main/products/:id?paramType=productId',
  edit: '/main/products/:id?paramType=productId',
  getAll: '/main/products',
  getOne: '/main/products/:id?paramType=productId',
  getAutoCompleteVendor: '/vendor/active',
  image: { create: '/main/cloud-files' },
};

export default apiRoute;
