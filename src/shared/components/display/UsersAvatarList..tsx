import { Fragment } from 'react';
import {
  Box,
  Divider,
  IconButton,
  List,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { IAssignUserSchema } from 'features/queue/interfaces';
import { Size } from 'shared/enums';
import Avatar from 'shared/theme/components/Avatar';
import Popover from 'shared/theme/components/Popover';
import EllipseMenuItem from '../menu/EllipseMenuItem';

interface IProps {
  users: IAssignUserSchema[];
  selectedUsers?: IAssignUserSchema[];
  setSelectedUsers?: React.Dispatch<React.SetStateAction<IAssignUserSchema[]>>;
  size?: Size;
  showCheckbox?: boolean;
}

interface IUserAvatarPopover {
  users: IAssignUserSchema[];
  showCheckbox?: boolean;
  selectedUsers?: IAssignUserSchema[];
  setSelectedUsers?: React.Dispatch<React.SetStateAction<IAssignUserSchema[]>>;
}

export function UserAvatarPopover({
  users,
  showCheckbox,
  selectedUsers,
  setSelectedUsers,
}: IUserAvatarPopover) {
  const usersLength = users.length;
  const dynamicNumber = usersLength - 3;
  const theme = useTheme();

  const userAvatarPopoverStyles = {
    height: 30,
    width: 30,
    backgroundColor: `${theme.palette.gray.light}`,
    // border: '3px solid green',
    // padding: 1,
  };

  const triggerElement = (
    <IconButton sx={userAvatarPopoverStyles}>
      <Typography variant="bodyTextSmallMd" color="common.black">
        +{dynamicNumber}
      </Typography>
    </IconButton>
  );

  return (
    <Popover
      isIconButton={false}
      triggerElement={triggerElement}
      sx={{
        minWidth: 368,
        maxWidth: 500,
      }}
    >
      <Box>
        <Box p={4}>
          <Typography variant="bodyTextLarge" color="gray.darker">
            Assigned Representatives
          </Typography>
        </Box>
        <Divider />
        <List className="MuiPopover-list fixed-height">
          {users.slice(3).map((user, idx) => {
            const isUserActive = !!selectedUsers?.find(
              (item) => item?._id === user?._id
            );

            const onUsersMenuItemClick = () => {
              const checkIfUserExistsOnSelectedUsers = !!selectedUsers?.find(
                (item) => item._id === user._id
              );
              if (checkIfUserExistsOnSelectedUsers) {
                if (!setSelectedUsers) return;
                setSelectedUsers((prevState) =>
                  prevState.filter((item) => item._id !== user._id)
                );
              } else {
                if (!setSelectedUsers) return;
                setSelectedUsers((prevState) => [...prevState, user]);
              }
            };

            return (
              <Fragment key={user._id}>
                <EllipseMenuItem
                  showCheckbox={showCheckbox}
                  checked={isUserActive}
                  key={user._id}
                  text={`${user.firstName} ${user.lastName}`}
                  icon={Avatar}
                  iconProps={{
                    className: 'size-small',
                    title: `${user.firstName} ${user.lastName}`,
                  }}
                  onClick={onUsersMenuItemClick}
                />
                {idx !== users.slice(3).length - 1 && (
                  <Divider variant="middle" light />
                )}
              </Fragment>
            );
          })}
        </List>
      </Box>
    </Popover>
  );
}

UserAvatarPopover.defaultProps = {
  showCheckbox: false,
  selectedUsers: [],
  setSelectedUsers: () => {},
};

export function UsersAvatarList({
  users,
  size,
  selectedUsers,
  setSelectedUsers,
  showCheckbox,
}: IProps) {
  return (
    <Stack
      display="flex"
      direction="row"
      spacing={1}
      alignItems="center"
      width="100%"
    >
      {users.slice(0, 3).map((user) => {
        const isAvatarActive = selectedUsers?.find(
          (item) => item?._id === user?._id
        );

        const usersAvatarStyles = {
          cursor: 'pointer',
          border: isAvatarActive ? '3px solid green' : '0',
          borderRadius: '100%',
          padding: isAvatarActive ? 0.2 : 0,
        };

        const handleOnClickAvatar = () => {
          const checkIfUserExistsOnSelectedUsers = !!selectedUsers?.find(
            (item) => item._id === user._id
          );
          if (!setSelectedUsers) return;
          if (checkIfUserExistsOnSelectedUsers) {
            setSelectedUsers((prevState) =>
              prevState.filter((item) => item._id !== user._id)
            );
          } else {
            setSelectedUsers((prevState) => [...prevState, user]);
          }
        };

        return (
          <Box
            key={user._id}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={usersAvatarStyles}
            onClick={handleOnClickAvatar}
          >
            <Avatar
              tooltip
              key={user._id}
              className={size}
              title={`${user.firstName} ${user.lastName}`}
              src=""
            />
          </Box>
        );
      })}
      {(users?.length || 0) > 3 ? (
        <UserAvatarPopover
          users={users}
          showCheckbox={showCheckbox}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      ) : null}
    </Stack>
  );
}

UsersAvatarList.defaultProps = {
  size: Size.MEDIUM,
  showCheckbox: false,
  selectedUsers: [],
  setSelectedUsers: () => {},
};
