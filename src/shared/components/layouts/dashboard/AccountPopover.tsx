import {
  Stack,
  Box,
  Typography,
  SxProps,
  List,
  useTheme,
  Divider,
} from '@mui/material';
import { BsPersonVcard } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import uiRoute from 'shared/constants/uiRoute';
import Avatar from 'shared/theme/components/Avatar';
import Chip from 'shared/theme/components/Chip';
import Popover from 'shared/theme/components/Popover';
import { useGetRole } from 'shared/utils/store';

interface IAccountPopoverProps {
  src?: string;
  alt?: string;
  username: string;
  avatarStyle?: SxProps;
  className?: string;
}

export function AccountPopover({
  src,
  alt,
  username,
  avatarStyle,
  className,
}: IAccountPopoverProps) {
  const navigate = useNavigate();
  // const authModule = useBoundStore.use.authModule();
  const role = useGetRole();
  const theme = useTheme();
  const triggerElement = (
    <Stack
      flexDirection="row"
      gap={className === 'size-large' ? 4 : 2}
      alignItems="center"
    >
      <Avatar
        title={username}
        avatarstyle={avatarStyle}
        src={src}
        alt={alt}
        className={className}
      />
      <Box
        // maxWidth={theme.spacing(36)}
        sx={{
          [theme.breakpoints.down('sm')]: {
            display: 'none',
          },
        }}
      >
        <Stack alignItems="flex-start">
          {/* <Typography
            variant="bodyTextLarge"
            textAlign="left"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            width="100%"
            color="common.black"
          >
            {username || ''}
          </Typography> */}
          {!!role?.name && (
            <Chip
              label={role.name}
              size="small"
              className="chip-badge chip-badge--info"
            />
          )}
        </Stack>
      </Box>
    </Stack>
  );

  return (
    <Popover
      isIconButton={false}
      triggerElement={triggerElement}
      sx={{
        minWidth: 180,
      }}
    >
      <Box>
        <Stack direction="row" gap={2} p={4} alignItems="center">
          <Avatar title={username || ''} className="size-small" />
          <Stack spacing={1}>
            <Typography variant="bodyTextLargeMd">{username}</Typography>
            <Box>
              {!!role?.name && (
                <Chip
                  label={role.name}
                  size="small"
                  className="chip-badge chip-badge--info"
                />
              )}
            </Box>
          </Stack>
        </Stack>
        <Divider
          sx={{
            mx: 4,
          }}
        />
        <List className="MuiPopover-list compact">
          <EllipseMenuItem
            text="Edit Profile"
            icon={BsPersonVcard}
            onClick={() => navigate(uiRoute.profile.profile)}
          />
          <EllipseMenuItem
            text="Log Out"
            icon={IoIosLogOut}
            onClick={() => navigate(uiRoute.auth.logout)}
          />
        </List>
      </Box>
    </Popover>
  );
}

AccountPopover.defaultProps = {
  src: '',
  alt: '',
  className: '',
  avatarStyle: {},
};
