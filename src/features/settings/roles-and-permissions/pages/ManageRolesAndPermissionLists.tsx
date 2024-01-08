import React, { useState } from 'react';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsArrowLeft } from 'react-icons/bs';
import { Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { cloneDeep } from 'lodash';
import { managePermissionPayload } from 'shared/utils/common';
import { LoadingButton } from '@mui/lab';
import { useBoundStore } from 'shared/stores/useBoundStore';
import RolesCard from '../components/RolesCard';
import ManageRolesAndPermissionsTableBanner from '../components/manage-roles-and-permissions/ManageRolesAndPermissionsTableBanner';
import { IResource } from '../interfaces';
import {
  useAssignPermissionsToRoleMutation,
  useAssignPermissionsToUserRoleMutation,
} from '../mutations';

export default function ManageRolesAndPermissionLists() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [permissions, setPermissions] = useState<IResource[]>([]);
  const [resourcesBackup, setResourceBackup] = useState<IResource[]>([]);

  const assignRolesToPermissionMutation = useAssignPermissionsToRoleMutation();
  const assignUserRolesToPermissionMutation =
    useAssignPermissionsToUserRoleMutation();

  const updatePermissions = (updatedPermissions: IResource[]) => {
    setPermissions(updatedPermissions);
  };

  const rolesId = searchParams.get('roleId');
  const userId = searchParams.get('userId');
  const role = searchParams.get('role');
  const isManageUserPermission = !!userId;
  const getAuthData = useBoundStore.getState().authData;
  const getAuthModule = useBoundStore.getState().authModule;

  const assignMutation = isManageUserPermission
    ? assignUserRolesToPermissionMutation
    : assignRolesToPermissionMutation;

  const handleActionClick = () => {
    const permissionsPayload = managePermissionPayload(permissions);

    const formatPayload = {
      resources: permissionsPayload,
    };

    if (!rolesId && !userId) return;

    assignMutation.mutate(
      {
        id: isManageUserPermission ? userId! : rolesId!,
        data: formatPayload,
      },
      {
        onSuccess: () => {
          if (!!userId && getAuthData?.userId === userId) {
            navigate(0);
          }
          if (!!role && getAuthModule?.role?.code === role) navigate(0);
        },
      }
    );
  };

  const handleResetPermissions = () => {
    updatePermissions(resourcesBackup);
  };

  return (
    <>
      <Box p={2}>
        <Button
          size={ButtonSize.SMALL}
          variant={ButtonVariant.TEXT}
          prefix={<BsArrowLeft />}
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </Box>

      <ManageRolesAndPermissionsTableBanner />
      <RolesCard
        mainResources={cloneDeep(permissions)}
        updatePermissions={updatePermissions}
        setResourceBackup={setResourceBackup}
      />
      <Box display="flex" gap={2} justifyContent="flex-end" padding={4}>
        <Button
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.OUTLINED}
          onClick={handleResetPermissions}
        >
          Reset Permission
        </Button>
        <LoadingButton
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.CONTAINED}
          onClick={handleActionClick}
          loading={assignMutation.isLoading}
        >
          Save
        </LoadingButton>
      </Box>
    </>
  );
}
