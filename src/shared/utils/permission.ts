interface ISubModules extends IResource {
  parent: string;
  order: number;
  icon: string;
}

interface IResource {
  _id: string;
  code: string;
  name: string;
  routePath: string;
  subModules: ISubModules[];
}

export const getRoutesFromPermissionResource = (resources: IResource[]) => {
  const routePaths: string[] = [];

  function traverseModules(modules: IResource[]) {
    modules.forEach((module: IResource) => {
      if (module.routePath) {
        routePaths.push(module.routePath);
      }

      if (module.subModules) {
        traverseModules(module.subModules);
      }
    });
  }

  traverseModules(resources);

  return routePaths;
};

export const getFirstRouteFromPermission = (resources: IResource[]) => {
  if (!resources?.length) return null;
  if (resources[0]?.subModules?.[0]?.routePath)
    return resources[0].subModules[0].routePath;
  return resources[0].routePath;
};
