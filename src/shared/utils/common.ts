/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-lonely-if */
/* eslint-disable @typescript-eslint/default-param-last */
/* eslint-disable no-param-reassign */
import { RolesCode } from 'features/settings/roles-and-permissions/enums';
import {
  IAssignedResource,
  IPermission,
  IResource,
} from 'features/settings/roles-and-permissions/interfaces';
import { HEADER_TITLE, TITLE_TYPE } from 'shared/constants/dashboardTitle';
import { useBoundStore } from 'shared/stores/useBoundStore';

interface IPermissionChangeHandler {
  resources: IResource[];
  resourceMeta: IResource;
  permissionMeta?: IPermission;
  isChecked: boolean;
  callBackFunction: (newResources: IResource[]) => void;
}

/**
 * The function `handlePermissionFlags` updates the `isChecked` property of each permission object in
 * an array based on a given boolean value.
 * @param {IPermission[]} permissions - An array of objects representing permissions. Each object
 * should have a property called "isChecked" which indicates whether the permission is checked or not.
 * @param {boolean} isChecked - A boolean value indicating whether the permissions should be checked or
 * unchecked.
 */
const handlePermissionFlags = (
  permissions: IPermission[] = [],
  isChecked: boolean
) => {
  permissions?.forEach((permission: IPermission) => {
    permission.isChecked = isChecked;
  });
};

/**
 * The function recursively handles the permissions and checks/unchecks the resources and their
 * children.
 * @param {IResource} resourceMeta - The `resourceMeta` parameter is an object that represents a
 * resource. It contains information about the resource, such as its permissions and sub-modules.
 * @param [isChecked=false] - A boolean value indicating whether the resource is checked or not. It has
 * a default value of `false`.
 */
const handleChildrenResources = (
  resourceMeta: IResource,
  isChecked = false
) => {
  handlePermissionFlags(resourceMeta.permissions, isChecked);

  // If it has children
  if (resourceMeta.subModules?.length) {
    resourceMeta.subModules.forEach((subResource: IResource) => {
      subResource.isChecked = isChecked;
      subResource.isIndeterminate = false;
      handlePermissionFlags(subResource.permissions, isChecked);
      handleChildrenResources(subResource, isChecked);
    });
  }
};

/**
 * The function `selectResource` updates the `isIndeterminate` and `isChecked` properties of a resource
 * based on the provided type.
 * @param {IResource} resource - The `resource` parameter is of type `IResource`, which is likely an
 * interface or a type representing some kind of resource object. It is used to store information about
 * the resource, such as whether it is checked or indeterminate.
 * @param {'Partial' | 'Full' | null} type - The `type` parameter is a string that can have one of
 * three values: 'Partial', 'Full', or null.
 */
const selectResource = (
  resource: IResource,
  type: 'Partial' | 'Full' | null
) => {
  if (!type) {
    resource.isIndeterminate = false;
    resource.isChecked = false;
  } else {
    if (type === 'Partial') {
      resource.isIndeterminate = true;
      resource.isChecked = false;
    } else {
      resource.isChecked = true;
      resource.isIndeterminate = false;
    }
  }
};

/**
 * The function `handleFlags` selects a resource based on the provided flags.
 * @param {IResource} resourceMeta - The `resourceMeta` parameter is of type `IResource` and represents
 * metadata about a resource. It could include information such as the resource's name, type, size, and
 * other relevant details.
 * @param {boolean} isChecked - A boolean value indicating whether the resource is checked or not.
 * @param {boolean} [isAllFlagged] - A boolean value indicating whether all resources should be flagged
 * or not.
 */
const handleFlags = (
  resourceMeta: IResource,
  isChecked: boolean,
  isAllFlagged?: boolean
) => {
  if (isAllFlagged) {
    selectResource(resourceMeta, isChecked ? 'Full' : null);
  } else {
    selectResource(resourceMeta, 'Partial');
  }
};

/**
 * The function `findParent` recursively searches for a resource with a specific code within a nested
 * array of resources.
 * @param {IResource[]} resources - An array of objects representing resources. Each resource object
 * has a property called "code" which is a string.
 * @param {string} parent - The `parent` parameter is a string that represents the code of the parent
 * resource we are searching for.
 * @returns The function `findParent` returns an `IResource` object if a resource with the specified
 * parent code is found in the `resources` array or its sub-modules. If no matching resource is found,
 * it returns `undefined`.
 */
const findParent = (
  resources: IResource[] = [],
  parent: string
): IResource | undefined => {
  let parentResource = resources.find((resource) => resource.code === parent);
  if (!parentResource) {
    // Since the parent doesn't match to resources of current level, we need to search for it's child resources
    for (const resource of resources) {
      if (resource.subModules?.length) {
        parentResource = findParent(resource.subModules, parent);
        if (parentResource) break;
      }
    }
  }

  return parentResource;
};

/**
 * The function handles the indeterminate state of a parent resource based on its child resources.
 * @param {IResource} resourceMeta - The `resourceMeta` parameter is an object that represents the
 * metadata of a resource. It likely contains properties such as `parent`, `isIndeterminate`, and
 * possibly others that are relevant to the resource.
 * @param {IResource[]} resources - An array of resources. Each resource object has properties like
 * "parent" and "isIndeterminate".
 */
const handleParentIndeterminate = (
  resourceMeta: IResource,
  resources: IResource[]
) => {
  const { parent } = resourceMeta;
  if (parent) {
    const parentResource = findParent(resources, parent);

    if (parentResource) {
      parentResource.isIndeterminate =
        resourceMeta.isIndeterminate ||
        resources.some((siblingResource) => siblingResource.isIndeterminate);
      handleParentIndeterminate(parentResource, resources);
    }
  }
};

/**
 * The function `handleParentResources` handles the checking and unchecking of parent resources based
 * on the state of their child resources.
 * @param {IResource} resourceMeta - An object that represents the current resource. It contains
 * information about the resource, such as its permissions and parent resource.
 * @param {IResource[]} resources - An array of resource objects. Each resource object has the
 * following properties:
 * @param [isChecked=false] - A boolean value indicating whether the resource should be checked or
 * unchecked.
 * @param {IPermission} [permissionMeta] - The `permissionMeta` parameter is an optional object that
 * represents the metadata of a permission. It contains information such as the name of the permission,
 * whether it is checked or not, and any other relevant data related to the permission.
 */
const handleParentResources = (
  resourceMeta: IResource,
  resources: IResource[],
  isChecked = false,
  permissionMeta?: IPermission
) => {
  let isAllPermissionsFlagged = true;
  if (permissionMeta) {
    permissionMeta.isChecked = isChecked;

    // Check if all the sibling permissions are flagged
    if (resourceMeta.permissions?.length) {
      isAllPermissionsFlagged = resourceMeta.permissions?.every(
        (permission: IPermission) => permission.isChecked === isChecked
      );

      handleFlags(resourceMeta, isChecked, isAllPermissionsFlagged);

      handleParentIndeterminate(resourceMeta, resources);
    }
  }

  if (isAllPermissionsFlagged) {
    // Search it's parent
    const { parent } = resourceMeta;
    if (parent) {
      // Search all the Siblings
      const parentResource = findParent(resources, parent);

      if (parentResource) {
        // Check if all the siblings are checked or unchecked
        const isAllFlagged = parentResource?.subModules?.every(
          (sibling) =>
            !sibling.isIndeterminate && sibling.isChecked === isChecked
        );

        handleFlags(parentResource, isChecked, isAllFlagged);

        // Check it's grand parents as well
        handleParentResources(parentResource, resources, isChecked);
      }
    }
  }
};

export const permissionChangeHandler = ({
  callBackFunction,
  resources,
  resourceMeta,
  permissionMeta,
  isChecked,
}: // eslint-disable-next-line consistent-return
IPermissionChangeHandler): any => {
  resourceMeta.isChecked = isChecked;
  resourceMeta.isIndeterminate = false;

  if (!permissionMeta && resourceMeta)
    // Handle all the child resources first
    handleChildrenResources(resourceMeta, isChecked);

  // Handle it's respective parent resources
  handleParentResources(resourceMeta, resources, isChecked, permissionMeta);

  return callBackFunction(resources);
};

const resolveAdminRequiredResource = (
  resource: IResource,
  isAdminRelated: boolean
) => {
  if (resource) {
    if (resource.subModules?.length > 0) {
      resource.subModules.forEach((subModule) =>
        resolveAdminRequiredResource(subModule, isAdminRelated)
      );
      resource.isDisabledForAdminRelatedRoles = isAdminRelated
        ? resource.subModules?.some(
            (subModule) => subModule.isDisabledForAdminRelatedRoles
          )
        : false;
    } else {
      resource.isDisabledForAdminRelatedRoles = isAdminRelated
        ? resource.permissions?.some((permission) => {
            if (permission.isRequiredForAdmin) {
              permission.isDisabledForAdminRelatedRoles =
                isAdminRelated && permission.isRequiredForAdmin;
              return true;
            }
            return false;
          })
        : false;
    }
  }
};

/**
 * The function `checkAllResources` takes an array of resources and a boolean value, and updates the
 * `isChecked` property of each resource and its permissions recursively.
 * @param {IResource[]} resources - An array of resources. Each resource has the following properties:
 * @param {boolean} isChecked - A boolean value indicating whether the resources should be checked or
 * unchecked.
 * @returns an array of resources with updated isChecked and isIndeterminate properties.
 */
const checkAllResources = (resources: IResource[] = [], isChecked: boolean) => {
  return resources.map((resource: IResource) => {
    resource.isChecked = isChecked;
    resource.isIndeterminate = false;
    resource.permissions?.forEach((permission: IPermission) => {
      permission.isChecked = isChecked;
    });
    resource.subModules = checkAllResources(resource.subModules, isChecked);
    return resource;
  });
};

export const checkIfAdminRelated = (roleCode?: string) => {
  if (!roleCode) return false;

  return roleCode === RolesCode.ADMIN || roleCode === RolesCode.SUPER_ADMIN;
};

export const mapUserAssignedResources = (
  allResources: IResource[] = [],
  assignedResources: IAssignedResource[] = [],
  roleCode?: string
) => {
  const isAdminRelated = checkIfAdminRelated(roleCode);

  return (
    allResources
      // .filter((x) => !x.code.toUpperCase().includes('ROLES'))
      .map((resource) => {
        // Check if the resource has been assigned to the role
        const assignedResource = assignedResources.find(
          (x) => x.code === resource.code
        );

        // If assigned resource is not found, then mark the flag as unchecked
        if (!assignedResource) {
          checkAllResources([resource], false);
        } else {
          // Check if it has children
          if (assignedResource.subModules?.length > 0) {
            resource.subModules = mapUserAssignedResources(
              resource.subModules,
              assignedResource.subModules
            );
            // If any of the sibling resource is partially checked, then mark it's parent as indeterminate as well
            if (
              resource.subModules.some(
                (siblingResource) => siblingResource.isIndeterminate
              )
            ) {
              selectResource(resource, 'Partial');
            } else if (
              resource.subModules.every(
                (siblingResource) => siblingResource.isChecked
              )
            ) {
              selectResource(resource, 'Full');
            } else if (
              resource.subModules.some(
                (siblingResource) => siblingResource.isChecked
              )
            ) {
              selectResource(resource, 'Partial');
            } else {
              selectResource(resource, null);
            }
          } else {
            // Check if it contains all the permissions
            if (
              resource.permissions?.length ===
              assignedResource.permissions?.length
            ) {
              handlePermissionFlags(resource.permissions, true);
              selectResource(resource, 'Full');
            } else if (!resource.permissions?.length) {
              selectResource(resource, 'Full');
            } else {
              // If only partial permission are assigned
              resource.permissions?.forEach((permission) => {
                permission.isChecked = assignedResource.permissions?.includes(
                  permission.code
                );
              });
              selectResource(resource, 'Partial');
            }
          }
        }

        // Handle the isRequiredForAdmin flag for Admin Related Roles
        if (assignedResource) {
          resolveAdminRequiredResource(resource, isAdminRelated);
        }

        return resource;
      })
  );
};

export const managePermissionPayload = (
  selectedResources: IResource[] = []
) => {
  // const assignedResources: IAssignedResource[] = [];

  const resources: any[] = [];

  // selectedResources.forEach((resource) => {
  //   if (resource.isChecked || resource.isIndeterminate) {
  //     const assignedResource: IAssignedResource = {
  //       code: resource.code,
  //       parent: resource.parent,
  //       permissions:
  //         resource.permissions
  //           ?.filter((permission) => permission.isChecked)
  //           ?.map((x) => x.code) || [],
  //       subModules: managePermissionPayload(resource.subModules),
  //     };
  //     assignedResources.push(assignedResource);
  //   }
  // });

  selectedResources.map((resource) => {
    if (
      (resource.isChecked || resource.isIndeterminate) &&
      !resource.permissions
    ) {
      const assignedResource = {
        // resource: {
        permissions: resource?.permissions || [],
        code: resource?.code,
        // },
      };
      resources.push(assignedResource);
    }

    if (
      (resource.isChecked || resource.isIndeterminate) &&
      resource.permissions
    ) {
      const updatedPermissions: any[] = [];

      resource.permissions.map((y) => {
        if (y.isChecked) {
          updatedPermissions.push(y.code);
        }
      });

      const assignedResource = {
        // resource: {
        permissions: updatedPermissions,
        code: resource?.code,
        parent: resource?.parent || '',
        // },
      };
      resources.push(assignedResource);
    }

    if (
      (resource.isChecked || resource.isIndeterminate) &&
      resource?.subModules?.length
    ) {
      resource?.subModules.forEach((y) => {
        const updatedPermissions: any[] = [];

        if (y.isChecked || y.isIndeterminate) {
          y.permissions?.forEach((permission) => {
            if (permission.isChecked) updatedPermissions.push(permission.code);
          });

          const assignedResource = {
            // resource: {
            parent: y?.parent || '',
            code: y?.code,
            permissions: updatedPermissions,
            // },
          };
          resources.push(assignedResource);
        }
      });
    }
  });

  return resources;
};
export const formatFullName = (firstName: string, lastName: string) =>
  `${firstName} ${lastName || ''}`;
export const checkAuthForPermissions = (
  moduleCode: string,
  permissionCode: string,
  resourceCode?: string
) => {
  const authModules = useBoundStore.use.authModule();

  if (resourceCode) {
    const checkAuthPermission = authModules?.modules
      ?.find((module: any) => module.code === moduleCode)
      ?.subModules?.find((subModule: any) => subModule.code === resourceCode)
      ?.permissions?.find(
        (permission: any) => permission.code === permissionCode
      );

    return !!checkAuthPermission;
  }

  const checkAuthPermission = authModules?.modules
    ?.find((module: any) => module.code === moduleCode)
    ?.permissions?.find(
      (permission: any) => permission.code === permissionCode
    );

  return !!checkAuthPermission;
};
export const checkHeader = (pathname: string) => {
  switch (pathname) {
    case TITLE_TYPE.ROLES_PERMISSION:
      return HEADER_TITLE[TITLE_TYPE.ROLES_PERMISSION];
    case TITLE_TYPE.USER_MANAGEMENT:
      return HEADER_TITLE[TITLE_TYPE.USER_MANAGEMENT];
    case TITLE_TYPE.DASHBOARD:
      return HEADER_TITLE[TITLE_TYPE.DASHBOARD];

    default:
      return HEADER_TITLE[TITLE_TYPE.EMPTY];
  }
};

export const formatCurrency = (
  value: string | number,
  elseNull = true,
  min = 2,
  max = 2
): string | null => {
  if (!value) return 'N/A';

  if (typeof value === 'string' && Number.isNaN(Number(value))) {
    return '-';
  }

  if (value || value === 0) {
    return new Intl.NumberFormat('ne-Np', {
      style: 'currency',
      currency: 'NPR',
      currencyDisplay: 'code',
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    }).format((+value / 100) as number);
  }

  if (!elseNull) {
    return formatCurrency(0);
  }

  return '-';
};

export const convertStringToNumber = (value: string | number): number => {
  if (typeof value === 'string') {
    return +value;
  }
  return 0;
};

export const convertNumberToString = (
  value?: number,
  divide = false
): string => {
  if (Number.isInteger(value) && !Number.isNaN(value)) {
    if (divide) {
      return String(value / 100);
    }
    return String(value);
  }
  return '';
};
