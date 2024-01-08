import { isEmpty, pickBy } from 'shared/utils/lodash';
import { mapKeys } from 'shared/utils/misc';
import { IRoleTableFilter } from '../interfaces';
import { roleConfig } from '../constants/config';
import { ModulesCodes } from '../enums';

export const formatRoleFilterParams = (filters: IRoleTableFilter) => {
  const params = pickBy(filters, (value: string | number) => value !== '');

  if (isEmpty(params)) {
    return params;
  }

  // Type assertion needed to escape type for empty object (i.e. {})
  return mapKeys(
    params as Record<string, unknown>,
    roleConfig.ROLES_TABLE_FILTER_MAP
  );
};

// export const formatRolesVirtualState = (allRoles: any, assignedRoles: any) => {
//   const SettingsModuleCode = ModulesCodes.SETTINGS;
//   const ChildPermissions: any[] = [];

//   const settingsFromAssignedRoles = assignedRoles.modules.find(
//     (item: any) => item.code === SettingsModuleCode
//   );

//   const settingsFromAllRoles = allRoles.rows.find(
//     (item: any) => item.code === SettingsModuleCode
//   );

//   const subModulesFromAllSettings = settingsFromAllRoles.subModules;
//   const subModulesFromAssignedSettings = settingsFromAssignedRoles.subModules;

//   // console.log('subModulesFromSettings', subModulesFromAllSettings);
//   // console.log('subModulesFromAssignedSettings', subModulesFromAssignedSettings);

//   const allowedParentPermissions = subModulesFromAssignedSettings?.map(
//     (item: any) => item?.code
//   );

//   // Getting allowed Child Permissions
//   subModulesFromAssignedSettings.forEach((subModules: any) => {
//     // Iterate through each permission of the subModules
//     subModules.permissions.forEach((permission: any) => {
//       // Add the permission to the consolidated array if not already present
//       if (!ChildPermissions.includes(permission)) {
//         ChildPermissions.push(permission);
//       }
//     });
//   });

//   console.log('Allowed Child Permissions', ChildPermissions);
//   console.log('Allowed Parent Permissions', allowedParentPermissions);
//   console.log('Skeleton', subModulesFromAllSettings);

//   return subModulesFromAllSettings;

//   // const skeletonRolesAndPermissions = subModulesFromAllSettings.map((item: any) => )
// };

export const formatRolesVirtualStates = (allRoles: any, assignedRoles: any) => {
  const SettingsModuleCode = ModulesCodes.SETTINGS;
  const ChildPermissions: any[] = [];

  const settingsFromAssignedRoles = assignedRoles.modules.find(
    (item: any) => item.code === SettingsModuleCode
  );

  const settingsFromAllRoles = allRoles.rows.find(
    (item: any) => item.code === SettingsModuleCode
  );

  const subModulesFromAllSettings = settingsFromAllRoles.subModules;
  const subModulesFromAssignedSettings = settingsFromAssignedRoles.subModules;

  // console.log('subModulesFromSettings', subModulesFromAllSettings);
  // console.log('subModulesFromAssignedSettings', subModulesFromAssignedSettings);

  const allowedParentPermissions = subModulesFromAssignedSettings?.map(
    (item: any) => item?.code
  );

  // Getting allowed Child Permissions
  subModulesFromAssignedSettings.forEach((subModules: any) => {
    // Iterate through each permission of the subModules
    subModules.permissions.forEach((permission: any) => {
      // Add the permission to the consolidated array if not already present
      if (!ChildPermissions.includes(permission)) {
        ChildPermissions.push(permission);
      }
    });
  });

  console.log('Allowed Child Permissions', ChildPermissions);
  console.log('Allowed Parent Permissions', allowedParentPermissions);
  console.log('Skeleton', subModulesFromAllSettings);

  return subModulesFromAllSettings;

  // const skeletonRolesAndPermissions = subModulesFromAllSettings.map((item: any) => )
};
