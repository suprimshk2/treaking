/* eslint-disable no-nested-ternary */
import React from 'react';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import EllipseMenu from 'shared/components/menu/EllipseMenu';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import { useConfirmationModal } from 'shared/stores/ConfirmationModal';
import { formatDateToView } from 'shared/utils/date';
import { UserStatus } from 'shared/enums';
import { useDeleteVendorMutation } from '../mutations';
import { IVendor } from '../interfaces';

interface IProps {
  data: IVendor;
  onEditClick: (id: string) => void;
}

function VendorTableRow({ data, onEditClick }: IProps) {
  const userConfirmationModal = useConfirmationModal();
  const deleteUserMutation = useDeleteVendorMutation();

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
        <Typography variant="bodyTextMedium">{data?.businessName}</Typography>
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
        {/* {!!currentStatus && (
          <Chip
            label={currentStatus.label}
            color={currentStatus.color as ColorType}
            size="small"
          />
        )} */}
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
      <TableCell align="right">
        <EllipseMenu>
          <EllipseMenuItem
            text="Edit"
            icon={BsPencilSquare}
            onClick={() => onEditClick(data?._id)}
          />

          <EllipseMenuItem
            text="Delete"
            icon={BsTrashFill}
            onClick={onDeleteClick}
          />
        </EllipseMenu>
      </TableCell>
    </TableRow>
  );
}

export const MemoizedVendorTableRow = React.memo(VendorTableRow);
