/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Box,
  TableCell,
  TableRow,
  Typography,
  IconButton,
} from '@mui/material';
import {
  BsClock,
  BsPencilSquare,
  BsTrashFill,
  BsCopy,
  BsChevronDown,
  BsChevronUp,
} from 'react-icons/bs';
import EllipseMenu from 'shared/components/menu/EllipseMenu';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import { useConfirmationModal } from 'shared/stores/ConfirmationModal';
import { ListWithIcon } from 'shared/components/display/list-with-icon/ListWithIcon';
import { formatDateTimeToView } from 'shared/utils/date';
import { ColorType } from 'shared/interfaces/misc';
import { formatFullName } from 'shared/utils/common';
import Chip from 'shared/theme/components/Chip';
import { useDeleteQuizMutation } from '../mutations';
import { IQuiz } from '../interfaces';
import { QuizTableRowCollapsible } from './QuizTableRowCollapsible';
import { QuizStatus } from '../enums';
import { formatQuizStatus } from '../utils';

interface IProps {
  data: IQuiz;
  onEditClick: (id: string) => void;
  onDuplicate: (id: string) => void;
}

function QuizTableRow({ data, onEditClick, onDuplicate }: IProps) {
  const userConfirmationModal = useConfirmationModal();
  const deleteUserMutation = useDeleteQuizMutation();
  const [open, setOpen] = useState(false);

  const status = formatQuizStatus(data?.startDate, data?.endDate);
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

  const quizStatusStyles = {
    [QuizStatus.COMPLETED]: {
      color: 'success',
      label: QuizStatus.COMPLETED,
    },
    [QuizStatus.UPCOMING]: {
      color: 'info',
      label: QuizStatus.UPCOMING,
    },
    [QuizStatus.RUNNING]: {
      color: 'warning',
      label: QuizStatus.RUNNING,
    },
  };

  const currentStatus =
    quizStatusStyles[status as keyof typeof quizStatusStyles];

  return (
    <>
      <TableRow key={data._id}>
        <TableCell className="expand-collapse-column">
          <Box>
            <IconButton
              aria-label="expand row"
              onClick={() => setOpen((prevState) => !prevState)}
              size="small"
            >
              {open ? <BsChevronUp /> : <BsChevronDown />}
            </IconButton>
          </Box>
        </TableCell>
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
                  text: formatDateTimeToView(data?.startDate?.toString()),
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
                  text: formatDateTimeToView(data?.endDate?.toString()),
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
              {formatFullName(
                data?.winner?.firstName,
                data?.winner?.lastName
              ) || 'N/A'}
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
      {open && <QuizTableRowCollapsible open={open} data={data} />}
    </>
  );
}

export const MemoizedQuizTableRow = React.memo(QuizTableRow);
