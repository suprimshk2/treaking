/* eslint-disable no-nested-ternary */
import React from 'react';
import { Box, TableCell, TableRow, Typography } from '@mui/material';
import { BsClock, BsPencilSquare, BsTrashFill, BsCopy } from 'react-icons/bs';
import EllipseMenu from 'shared/components/menu/EllipseMenu';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import { useConfirmationModal } from 'shared/stores/ConfirmationModal';
import { ListWithIcon } from 'shared/components/display/list-with-icon/ListWithIcon';
import { formatDateToView } from 'shared/utils/date';
import { UserStatus } from 'shared/enums';
import { ColorType } from 'shared/interfaces/misc';
import { formatFullName } from 'shared/utils/common';
import Chip from 'shared/theme/components/Chip';
import { useDeleteQuizMutation } from '../mutations';
import { IQuiz } from '../interfaces';

interface IProps {
  data: IQuiz;
  onEditClick: (id: string) => void;
  onDuplicate: (id: string) => void;
}

function QuizTableRow({ data, onEditClick, onDuplicate }: IProps) {
  const userConfirmationModal = useConfirmationModal();
  const deleteUserMutation = useDeleteQuizMutation();

  const status = data?.status;
  const onDeleteClick = async () => {
    const result = await userConfirmationModal?.openConfirmationModal({
      title: 'Delete Quiz',
      content: (
        <>
          Are you sure you want to delete &quot;
          <Typography
            component="span"
            sx={{ fontWeight: (theme) => theme.typography.fontWeightMedium }}
          >
            {data?.title}
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
        <Typography variant="bodyTextMedium">{data?.title}</Typography>
      </TableCell>
      <TableCell
        sx={{
          maxWidth: 200,
        }}
      >
        <Typography variant="bodyTextMedium">{data?.description}</Typography>
      </TableCell>
      <TableCell
        sx={{
          maxWidth: 200,
        }}
      >
        <Box display="flex" flexDirection="column">
          <ListWithIcon
            list={[
              {
                id: 1,
                icon: BsClock,
                text: formatDateToView(data?.startDate?.toString()),
                tooltip: true,
                truncateLength: 50,
              },
            ]}
          />
          <ListWithIcon
            list={[
              {
                id: 1,
                icon: BsClock,
                text: formatDateToView(data?.endDate?.toString()),
                tooltip: true,
                truncateLength: 50,
              },
            ]}
          />
        </Box>
      </TableCell>
      <TableCell>
        <Typography>test</Typography>
      </TableCell>

      <TableCell>
        <Box display="flex" flexDirection="row">
          <Typography>
            {formatFullName(data?.winner?.firstName, data?.winner?.lastName) ||
              'N/A'}
          </Typography>
        </Box>
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
      <TableCell>
        <Box display="flex" flexDirection="row">
          <Typography>{data?.created.name}</Typography>
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
            text="Duplicate"
            icon={BsCopy}
            onClick={() => onDuplicate(data?._id)}
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

export const MemoizedQuizTableRow = React.memo(QuizTableRow);
