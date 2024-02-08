/* eslint-disable no-nested-ternary */
import React from 'react';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import EllipseMenu from 'shared/components/menu/EllipseMenu';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import { useConfirmationModal } from 'shared/stores/ConfirmationModal';
import { formatDateToView } from 'shared/utils/date';
import { ResourceCode, UserStatus } from 'shared/enums';
import { useDeleteVendorMutation } from '../mutations';
import { IVendor } from '../interfaces';
import { vendorManagementPermissions } from 'features/settings/roles-and-permissions/enums';
import { checkAuthForPermissions } from 'shared/utils/common';
import { formatPhone } from 'shared/utils/misc';

interface IProps {
  data: IVendor;
  onEditClick: (id: string) => void;
}

function VendorTableRow({ data, onEditClick }: IProps) {
  const userConfirmationModal = useConfirmationModal();
  const deleteUserMutation = useDeleteVendorMutation();
  const isVendorUpdateEnabled = checkAuthForPermissions(
    ResourceCode.VENDORS_MANAGEMENT,
    vendorManagementPermissions.UPDATE
  );
  console.log(data?.phone);
  const isVendorDeleteEnabled = checkAuthForPermissions(
    ResourceCode.VENDORS_MANAGEMENT,
    vendorManagementPermissions.DELETE
  );
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
            {data?.businessName}
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
  //   const currentRole = roleStyles[role as keyof typeof roleStyles];
  //   const currentStatus =
  //     userStatusStyles[status as keyof typeof userStatusStyles];
  const isEnable = isVendorDeleteEnabled || isVendorUpdateEnabled;
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
        <Typography variant="bodyTextMedium">{data?.businessName}</Typography>
      </TableCell>
      <TableCell
        sx={{
          maxWidth: 200,
        }}
      >
        <Typography variant="bodyTextMedium">{data?.address}</Typography>
      </TableCell>
      <TableCell
        sx={{
          maxWidth: 200,
        }}
      >
        {data?.contacts?.map((item, index) => (
          <Typography key={index} variant="bodyTextMedium">
            {formatPhone(item.phone)}
          </Typography>
        ))}
      </TableCell>
      <TableCell>
        <Typography variant="bodyTextMedium">{data?.email}</Typography>
      </TableCell>

      <TableCell>
        <Box display="flex" flexDirection="row">
          <Typography variant="bodyTextMedium">
            {data?.accountOwner?.name}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Box display="flex" flexDirection="column">
          <Typography variant="bodyTextMedium">
            {data?.updated?.name}
          </Typography>

          <Typography variant="bodyTextMedium">
            {formatDateToView(data?.updated?.date)}
          </Typography>
        </Box>
      </TableCell>
      {isEnable && (
        <TableCell align="right">
          <EllipseMenu>
            {isVendorUpdateEnabled && (
              <EllipseMenuItem
                text="Edit"
                icon={BsPencilSquare}
                onClick={() => onEditClick(data?._id)}
              />
            )}

            {isVendorDeleteEnabled && (
              <EllipseMenuItem
                text="Delete"
                icon={BsTrashFill}
                onClick={onDeleteClick}
              />
            )}
          </EllipseMenu>
        </TableCell>
      )}
    </TableRow>
  );
}

export const MemoizedVendorTableRow = React.memo(VendorTableRow);
