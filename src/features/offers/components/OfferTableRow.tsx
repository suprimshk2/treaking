import React from 'react';
import { TableCell, TableRow, Tooltip, Typography } from '@mui/material';

import { formatDateToView } from 'shared/utils/date';
import { config } from 'shared/constants/config';
import Chip from 'shared/theme/components/Chip';
import { checkAndReplaceEmptyValue, truncateText } from 'shared/utils/misc';
import { IOffer } from '../interfaces';

const { DATE_FORMAT } = config;

interface IProps {
  data: IOffer;
  onEditClick: (offerId: string) => void;
}

function OfferTableRow({ data, onEditClick }: IProps) {
  // const onDeleteClick = async () => {
  //   const result = await offerConfirmationModal?.openConfirmationModal({
  //     title: 'Delete Offer',
  //     content: (
  //       <>
  //         Are you sure you want to delete &quot;
  //         <Typography
  //           component="span"
  //           sx={{ fontWeight: (theme) => theme.typography.fontWeightMedium }}
  //         >
  //           {data.demographic.fullName}
  //         </Typography>
  //         &quot;?
  //       </>
  //     ),
  //   });

  //   if (result) {
  //     offerConfirmationModal?.changeSubmittingStatus(true);

  //     deleteOfferMutation.mutate(
  //       { id: data._id },
  //       {
  //         onSettled: () => {
  //           offerConfirmationModal?.changeSubmittingStatus(false);
  //         },
  //       }
  //     );
  //   }
  // };

  // const textOverflowEllipseStyles = {
  //   whiteSpace: 'nowrap',
  //   overflow: 'hidden',
  //   textOverflow: 'ellipsis',
  // };

  const DEFAULT_TRUNCATE_LENGTH = 100;

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
        <Chip label="Active" color="success" />
      </TableCell>
      <TableCell>
        {data.updated?.by && data.updated.by}
        {data.updated?.by && <br />}
        {data.updated?.at && (
          <Typography variant="bodyTextMedium">
            {formatDateToView(data.updated.at, {
              inputDateFormat: DATE_FORMAT.ISO,
              outputDateFormat: DATE_FORMAT.dateViewFormat,
            })}
          </Typography>
        )}
      </TableCell>

      <TableCell align="right" />
    </TableRow>
  );
}

export const MemoizedOfferTableRow = React.memo(OfferTableRow);
