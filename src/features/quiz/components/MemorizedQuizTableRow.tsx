import React, { useState } from 'react';
import {
  Box,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  BsClock,
  BsPencilSquare,
  BsTrashFill,
  BsCopy,
  BsChevronDown,
  BsChevronUp,
} from 'react-icons/bs';
import { checkAuthForPermissions } from 'shared/utils/common';
import EllipseMenu from 'shared/components/menu/EllipseMenu';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import { useConfirmationModal } from 'shared/stores/ConfirmationModal';
import { ListWithIcon } from 'shared/components/display/list-with-icon/ListWithIcon';
import { FaPeopleGroup } from 'react-icons/fa6';

import { ColorType } from 'shared/interfaces/misc';

import Chip from 'shared/theme/components/Chip';
import useDisclosure from 'shared/hooks/useDisclosure';
import { useDeleteQuizMutation } from '../mutations';
import { IAdoptQuiz, Winner } from '../interfaces';
import { QuizTableRowCollapsible } from './QuizTableRowCollapsible';
import { QuizStatus } from '../enums';
import { WinnerAddModal } from './WinnerAddModel';
import { ResourceCode } from 'shared/enums';
import { quizManagementPermissions } from 'features/settings/roles-and-permissions/enums';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { WinnerListModel } from './WinnerListModel';

interface IProps {
  data: IAdoptQuiz;
  onEditClick: (id: string) => void;
  onDuplicate: (id: string) => void;
}

function QuizTableRow({ data, onEditClick, onDuplicate }: IProps) {
  const userConfirmationModal = useConfirmationModal();
  const deleteUserMutation = useDeleteQuizMutation();
  const [open, setOpen] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isWinnerProfileOpen,
    onClose: winnerProfileOnClose,
    onOpen: winnerProfileOnOpen,
  } = useDisclosure();
  const theme = useTheme();
  const status = data?.status;
  const onCloseClick = () => {
    onClose();
  };
  const onWinnerCloseClick = () => {
    winnerProfileOnClose();
  };
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
  const onWinnerAdd = () => {
    onOpen();
  };
  const isQuizUpdateEnabled = checkAuthForPermissions(
    ResourceCode.QUIZ_MANAGEMENT,
    quizManagementPermissions.UPDATE
  );
  const isQuizDeleteEnabled = checkAuthForPermissions(
    ResourceCode.QUIZ_MANAGEMENT,
    quizManagementPermissions.DELETE
  );
  const isWinnerEdit = !!data.winners.length;
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
          <Typography variant="bodyTextMedium">
            {data?.title || 'N/A'}
          </Typography>
        </TableCell>
        <TableCell
          sx={{
            maxWidth: 200,
          }}
        >
          <Typography
            variant="bodyTextMedium"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {data?.description}
          </Typography>
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
                  text: data?.startDate,
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
                  text: data?.endDate,
                  tooltip: true,
                  truncateLength: 50,
                },
              ]}
            />
          </Box>
        </TableCell>
        <TableCell>
          {data?.campaign ? (
            <>
              <Typography>{data?.campaignCode}</Typography>
              <Typography variant="bodyTextSmallMd">
                {data?.campaign}
              </Typography>
            </>
          ) : (
            <Typography
              justifyContent="flex-start"
              display="flex"
              alignItems="center"
              width="100%"
            >
              N/A
            </Typography>
          )}
        </TableCell>

        <TableCell>
          <Box display="flex" flexDirection="row">
            {data?.winners?.length <= 0 && (
              <Typography
                justifyContent="flex-start"
                display="flex"
                alignItems="center"
                width="100%"
              >
                N/A
              </Typography>
            )}
            {data?.winners?.length > 1 ? (
              <Button
                onClick={() => winnerProfileOnOpen()}
                size={ButtonSize.SMALL}
                buttonType={ButtonType.NORMAL}
                variant={ButtonVariant.TEXT}
                sx={{ color: theme.palette.gray.dark }}
              >
                <Typography
                  sx={{ textDecoration: 'underline' }}
                >{`${data?.winners.length} Winners`}</Typography>
              </Button>
            ) : (
              data?.winners?.map((winner: Winner, index) => (
                <Button
                  onClick={() => winnerProfileOnOpen()}
                  size={ButtonSize.SMALL}
                  buttonType={ButtonType.NORMAL}
                  variant={ButtonVariant.TEXT}
                  sx={{ color: theme.palette.gray.dark }}
                >
                  {winner?.fullName}
                </Button>
              ))
            )}
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
          {data.updated?.date && (
            <Box display="flex" flexDirection="column">
              <Typography variant="bodyTextMedium">
                {data?.updated?.name}
              </Typography>

              <Typography variant="bodyTextSmallMd">
                {data?.updated?.date}
              </Typography>
            </Box>
          )}
        </TableCell>
        <TableCell align="right">
          <EllipseMenu>
            {isQuizUpdateEnabled && (
              <EllipseMenuItem
                text="Edit"
                icon={BsPencilSquare}
                onClick={() => onEditClick(data?._id)}
              />
            )}
            <EllipseMenuItem
              text="Duplicate"
              icon={BsCopy}
              onClick={() => onDuplicate(data?._id)}
            />
            <EllipseMenuItem
              text={isWinnerEdit ? 'Edit Winner' : 'Add Winner'}
              icon={FaPeopleGroup}
              onClick={() => onWinnerAdd()}
            />

            {isQuizDeleteEnabled && (
              <EllipseMenuItem
                text="Delete"
                icon={BsTrashFill}
                onClick={onDeleteClick}
              />
            )}
          </EllipseMenu>
        </TableCell>
      </TableRow>
      {isOpen && (
        <WinnerAddModal
          quizId={data?.gameId}
          onClose={onCloseClick}
          isEditMode={isWinnerEdit}
        />
      )}
      {isWinnerProfileOpen && (
        <WinnerListModel quizId={data?.gameId} onClose={onWinnerCloseClick} />
      )}
      {open && <QuizTableRowCollapsible open={open} data={data} />}
    </>
  );
}

export const MemoizedQuizTableRow = React.memo(QuizTableRow);
