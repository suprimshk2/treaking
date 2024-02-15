import React from 'react';
import { TableCell, TableRow, Tooltip, Typography, Box } from '@mui/material';

import { formatDateToView } from 'shared/utils/date';
import { config } from 'shared/constants/config';
import Chip from 'shared/theme/components/Chip';
import { checkAndReplaceEmptyValue, truncateText } from 'shared/utils/misc';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import EllipseMenu from 'shared/components/menu/EllipseMenu';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import { ColorType } from 'shared/interfaces/misc';
import { useConfirmationModal } from 'shared/stores/ConfirmationModal';
import { IOffer } from '../interfaces';
import { getOfferStatus } from '../utils';
import { OfferStatus } from '../enums';
import { useDeleteOfferMutation } from '../mutations';
import { checkAuthForPermissions } from 'shared/utils/common';
import { ResourceCode } from 'shared/enums';
import { offerManagementPermissions } from 'features/settings/roles-and-permissions/enums';

const { DATE_FORMAT } = config;

interface IProps {
  data: IOffer;
  onEditClick: (offerId: string) => void;
}

function OfferTableRow({ data, onEditClick }: IProps) {
  const confirmationModal = useConfirmationModal();
  const deleteOfferMutation = useDeleteOfferMutation();
  const onDeleteClick = async () => {
    const result = await confirmationModal?.openConfirmationModal({
      title: 'Delete Offer',
      content: (
        <>
          Are you sure you want to delete &quot;
          <Typography
            component="span"
            sx={{ fontWeight: (theme) => theme.typography.fontWeightMedium }}
          >
            {data.title}
          </Typography>
          &quot;?
        </>
      ),
    });

    if (result) {
      confirmationModal?.changeSubmittingStatus(true);

      deleteOfferMutation.mutate(
        { id: data.offerId },
        {
          onSettled: () => {
            confirmationModal?.changeSubmittingStatus(false);
          },
        }
      );
    }
  };

  const DEFAULT_TRUNCATE_LENGTH = 100;

  const statusStyles = {
    [OfferStatus.ACTIVE]: {
      color: 'success',
      label: OfferStatus.ACTIVE,
    },
    [OfferStatus.UPCOMING]: {
      color: 'info',
      label: OfferStatus.UPCOMING,
    },
    [OfferStatus.EXPIRED]: {
      color: 'error',
      label: OfferStatus.EXPIRED,
    },
  };
  const status =
    statusStyles[
      getOfferStatus({
        availableUntil: data.availableUntil,
        startDate: data.startDate,
      })
    ];
  const isOfferDeleteEnabled = checkAuthForPermissions(
    ResourceCode.OFFERS_MANAGEMENT,
    offerManagementPermissions.DELETE
  );
  const isOfferEditEnabled = checkAuthForPermissions(
    ResourceCode.OFFERS_MANAGEMENT,
    offerManagementPermissions.UPDATE
  );

  const isEnable = isOfferEditEnabled || isOfferDeleteEnabled;
  return (
    <TableRow key={data.offerId}>
      <TableCell
        component="th"
        scope="data"
        sx={{
          maxWidth: 150,
          whiteSpace: 'break-spaces',
        }}
      >
        {checkAndReplaceEmptyValue(data?.vendor?.businessName)}
      </TableCell>
      <TableCell
        sx={{
          maxWidth: 200,
        }}
      >
        {checkAndReplaceEmptyValue(data?.title)}
      </TableCell>

      <TableCell
        sx={{
          maxWidth: 300,
          minWidth: 300,
        }}
      >
        <Tooltip arrow placement="top" title={data?.description || ''}>
          <Typography>
            {truncateText(
              checkAndReplaceEmptyValue(data?.description) || '',
              DEFAULT_TRUNCATE_LENGTH
            )}
          </Typography>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Chip label={status.label} color={status.color as ColorType} />
      </TableCell>
      <TableCell>
        {data.updated?.date && (
          <Box display="flex" flexDirection="column">
            <Typography variant="bodyTextMedium">
              {data?.updated?.name}
            </Typography>

            <Typography variant="bodyTextMedium">
              {formatDateToView(data?.updated?.date)}
            </Typography>
          </Box>
        )}
      </TableCell>

      {isEnable && (
        <TableCell align="right">
          <EllipseMenu>
            {isOfferEditEnabled && (
              <EllipseMenuItem
                text="Edit"
                icon={BsPencilSquare}
                onClick={() => onEditClick(data.offerId)}
              />
            )}
            {isOfferDeleteEnabled && (
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

export const MemoizedOfferTableRow = React.memo(OfferTableRow);
