import React from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
import EllipseMenu from 'shared/components/menu/EllipseMenu';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { useNavigate } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';

import { useConfirmationModal } from 'shared/stores/ConfirmationModal';
import { checkAuthForPermissions } from 'shared/utils/common';
import { ModuleCodes, ResourceCode } from 'shared/enums';
import { formatDateToView } from 'shared/utils/date';
import { config } from 'shared/constants/config';
import { useDeleteRoleMutation } from '../mutations';
import { IRole } from '../interfaces';
import { RolesMangementPermissions } from '../enums';

const { DATE_FORMAT } = config;

interface IProps {
  data: IRole;
  onEditClick: (id: string) => void;
}

function RolesAndPermissionTableRow({ data, onEditClick }: IProps) {
  const navigate = useNavigate();
  const deleteRoleMutation = useDeleteRoleMutation();
  const roleConfirmationModal = useConfirmationModal();

  const isRolesUpdateEnabled = checkAuthForPermissions(
    ModuleCodes.SETTING,
    RolesMangementPermissions.UPDATE,
    ResourceCode.ROLES_PERMISSION_MANAGEMENT
  );

  const isRolesDeleteEnabled = checkAuthForPermissions(
    ModuleCodes.SETTING,
    RolesMangementPermissions.DELETE,
    ResourceCode.ROLES_PERMISSION_MANAGEMENT
  );

  // const isRolesManageEnabled = checkAuthForPermissions(
  //   ModuleCodes.SETTING,
  //   RolesMangementPermissions.MANAGE_PERMISSION,
  //   ResourceCode.ROLES_PERMISSION_MANAGEMENT
  // );

  const isRolesManageEnabled = checkAuthForPermissions(
    ResourceCode.ROLES_PERMISSION_MANAGEMENT,
    RolesMangementPermissions.MANAGE_PERMISSION
  );

  const isEllipsisEnabled = isRolesUpdateEnabled || isRolesDeleteEnabled;

  const onDeleteClick = async () => {
    const result = await roleConfirmationModal?.openConfirmationModal({
      title: 'Delete Role',
      content: (
        <>
          Are you sure you want to delete &quot;
          <Typography
            component="span"
            sx={{ fontWeight: (theme) => theme.typography.fontWeightMedium }}
          >
            {data.name}
          </Typography>
          &quot;?
        </>
      ),
    });

    if (result) {
      roleConfirmationModal?.changeSubmittingStatus(true);

      deleteRoleMutation.mutate(
        { id: data._id },
        {
          onSettled: () => {
            roleConfirmationModal?.changeSubmittingStatus(false);
          },
        }
      );
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Typography>{data.name}</Typography>
      </TableCell>
      <TableCell>
        <Button
          size={ButtonSize.SMALL}
          variant={ButtonVariant.OUTLINED}
          disabled={!isRolesManageEnabled}
          onClick={() =>
            navigate(
              `${uiRoute.rolePermissionManagement.manageRolesAndPermissions}?roleId=${data._id}&role=${data.code}`
            )
          }
        >
          Manage Permissions
        </Button>
      </TableCell>
      <TableCell>
        {data.updated?.name || data.created?.name || ''}
        {(data.updated?.name || data.created?.name) && <br />}
        {data.created?.date
          ? formatDateToView(data.updated?.date || data.created?.date, {
              inputDateFormat: DATE_FORMAT.ISO,
              outputDateFormat: DATE_FORMAT.dateViewFormat,
            })
          : ''}
      </TableCell>
      <TableCell align="right">
        <Typography>
          {isEllipsisEnabled && (
            <EllipseMenu>
              {isRolesUpdateEnabled && (
                <EllipseMenuItem
                  text="Edit"
                  icon={BsPencilSquare}
                  onClick={() => onEditClick(data._id)}
                />
              )}
              {isRolesDeleteEnabled && (
                <EllipseMenuItem
                  text="Delete"
                  icon={BsTrashFill}
                  onClick={onDeleteClick}
                />
              )}
            </EllipseMenu>
          )}
        </Typography>
      </TableCell>
    </TableRow>
  );
}

export const MemoizedRolesAndPermissionsTableRow = React.memo(
  RolesAndPermissionTableRow
);
