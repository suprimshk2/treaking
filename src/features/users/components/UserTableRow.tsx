/* eslint-disable no-nested-ternary */
import React from 'react';
import { TableCell, TableRow, Typography } from '@mui/material';
import {
  BsEnvelope,
  BsKey,
  BsPencilSquare,
  BsPhone,
  BsSend,
  BsTrashFill,
} from 'react-icons/bs';

import EllipseMenu from 'shared/components/menu/EllipseMenu';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import { useConfirmationModal } from 'shared/stores/ConfirmationModal';
import { ListWithIcon } from 'shared/components/display/list-with-icon/ListWithIcon';
import { formatDateToView } from 'shared/utils/date';
import { config } from 'shared/constants/config';
import { ModuleCodes, ResourceCode, Role, UserStatus } from 'shared/enums';
import { ColorType } from 'shared/interfaces/misc';
import { checkAuthForPermissions } from 'shared/utils/common';
import { useNavigate } from 'react-router-dom';
import { RolesMangementPermissions } from 'features/settings/roles-and-permissions/enums';
import Chip from 'shared/theme/components/Chip';
import { IUser } from '../interfaces';
import { useDeleteUserMutation, useSendInviteMutation } from '../mutations';
import { UserMangementPermissions } from '../enums';

const { DATE_FORMAT } = config;

interface IProps {
  data: IUser;
  onEditClick: (userId: string) => void;
}

function UserTableRow({ data, onEditClick }: IProps) {
  const userConfirmationModal = useConfirmationModal();
  const deleteUserMutation = useDeleteUserMutation();
  const sendInviteMutation = useSendInviteMutation();
  const navigate = useNavigate();
  const isUserUpdateEnabled = checkAuthForPermissions(
    ModuleCodes.SETTING,
    UserMangementPermissions.UPDATE,
    ResourceCode.USER_MANAGEMENT
  );

  const isUserDeleteEnabled = checkAuthForPermissions(
    ModuleCodes.SETTING,
    UserMangementPermissions.DELETE,
    ResourceCode.USER_MANAGEMENT
  );

  const isUserInviteEnabled = checkAuthForPermissions(
    ModuleCodes.SETTING,
    UserMangementPermissions.INVITE,
    ResourceCode.USER_MANAGEMENT
  );

  const isUserManagePermissionEnabled = checkAuthForPermissions(
    ModuleCodes.SETTING,
    RolesMangementPermissions.MANAGE_PERMISSION,
    ResourceCode.ROLES_PERMISSION_MANAGEMENT
  );

  const role = data?.association?.roles?.[0];
  const status = data?.status;
  const isUserStatusActive = status && status === UserStatus.ACTIVE;

  const isEllipsisEnabled =
    isUserUpdateEnabled ||
    isUserDeleteEnabled ||
    isUserInviteEnabled ||
    isUserManagePermissionEnabled;

  const onDeleteClick = async () => {
    const result = await userConfirmationModal?.openConfirmationModal({
      title: 'Delete User',
      content: (
        <>
          Are you sure you want to delete &quot;
          <Typography
            component="span"
            sx={{ fontWeight: (theme) => theme.typography.fontWeightMedium }}
          >
            {data.demographic.fullName}
          </Typography>
          &quot;?
        </>
      ),
    });

    if (result) {
      userConfirmationModal?.changeSubmittingStatus(true);

      deleteUserMutation.mutate(
        { id: data._id },
        {
          onSettled: () => {
            userConfirmationModal?.changeSubmittingStatus(false);
          },
        }
      );
    }
  };

  const onInviteUserClick = async () => {
    const result = await userConfirmationModal?.openConfirmationModal({
      title: 'Invite User',
      content: (
        <>
          Are you sure you want to send an invitation email to &quot;
          <Typography
            component="span"
            sx={{ fontWeight: (theme) => theme.typography.fontWeightMedium }}
          >
            {data.demographic.fullName}
          </Typography>
          &quot;?
        </>
      ),
    });

    if (result) {
      userConfirmationModal?.changeSubmittingStatus(true);

      sendInviteMutation.mutate(
        { data: { email: data.demographic.email } },
        {
          onSettled: () => {
            userConfirmationModal?.changeSubmittingStatus(false);
          },
        }
      );
    }
  };
  const onManagePermissionClick = async () => {
    navigate(
      `/settings/roles-permission-management/manage-roles-and-permissions?userId=${data._id}`
    );
  };

  const roleStyles = {
    [Role.ADMIN]: {
      color: 'info',
      label: Role.ADMIN_TEXT,
    },
    [Role.REPRESENTATIVE]: {
      color: 'success',
      label: Role.REPRESENTATIVE_TEXT,
    },
  };

  const userStatusStyles = {
    [UserStatus.ACTIVE]: {
      color: 'success',
      label: UserStatus.ACTIVE,
    },
    [UserStatus.INACTIVE]: {
      color: 'error',
      label: UserStatus.INACTIVE,
    },
  };
  const currentRole = roleStyles[role as keyof typeof roleStyles];
  const currentStatus =
    userStatusStyles[status as keyof typeof userStatusStyles];

  return (
    <TableRow key={data._id}>
      <TableCell
        component="th"
        scope="data"
        sx={{
          maxWidth: 150,
          whiteSpace: 'break-spaces',
        }}
      >
        <Typography variant="bodyTextMedium">
          {data.demographic.fullName}
        </Typography>
      </TableCell>
      <TableCell>
        {currentRole ? (
          <Chip
            label={currentRole.label}
            color={currentRole.color as ColorType}
            size="small"
          />
        ) : role ? (
          <Chip label={role} color="success" size="small" />
        ) : (
          ''
        )}
      </TableCell>
      <TableCell
        sx={{
          maxWidth: 200,
        }}
      >
        <ListWithIcon
          list={[
            {
              id: 1,
              icon: BsEnvelope,
              text: data.demographic.email,
              tooltip: true,
              truncateLength: 50,
            },
          ]}
        />
      </TableCell>
      <TableCell>
        <ListWithIcon
          list={[
            {
              id: 2,
              icon: BsPhone,
              text: data?.demographic?.mobileNumber,
            },
          ]}
        />
        {/* <ListWithIcon
          list={[
            {
              id: 1,
              icon: BsGeoAlt,
              text: <Address address={address} />,
            },
          ]}
        /> */}
      </TableCell>

      <TableCell>
        {data.updated?.name && data.updated.name}
        {data.updated?.name && <br />}
        {data.updated?.date && (
          <Typography variant="bodyTextMedium">
            {formatDateToView(data.updated.date, {
              inputDateFormat: DATE_FORMAT.ISO,
              outputDateFormat: DATE_FORMAT.dateViewFormat,
            })}
          </Typography>
        )}
      </TableCell>
      <TableCell>
        {!!currentStatus && (
          <Chip
            label={currentStatus.label}
            color={currentStatus.color as ColorType}
            size="small"
          />
        )}
      </TableCell>
      <TableCell align="right">
        {isEllipsisEnabled && (
          <EllipseMenu>
            {isUserManagePermissionEnabled && (
              <EllipseMenuItem
                text="Manage Permissions"
                icon={BsKey}
                onClick={onManagePermissionClick}
              />
            )}

            {isUserInviteEnabled && !isUserStatusActive && (
              <EllipseMenuItem
                text="Invite"
                icon={BsSend}
                onClick={onInviteUserClick}
              />
            )}

            {isUserUpdateEnabled && (
              <EllipseMenuItem
                text="Edit"
                icon={BsPencilSquare}
                onClick={() => onEditClick(data._id)}
              />
            )}

            {isUserDeleteEnabled && (
              <EllipseMenuItem
                text="Delete"
                icon={BsTrashFill}
                onClick={onDeleteClick}
              />
            )}
          </EllipseMenu>
        )}
      </TableCell>
    </TableRow>
  );
}

export const MemoizedUserTableRow = React.memo(UserTableRow);
