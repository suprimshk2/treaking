import { Stack, Typography, SxProps } from '@mui/material';
import Avatar from 'shared/theme/components/Avatar';

interface IProps {
  src?: string;
  alt?: string;
  username: string;
  avatarStyle?: SxProps;
  className?: string;
  email?: string;
}
export default function UserProfileDetails({
  src,
  alt,
  username,
  avatarStyle,
  className,
  email,
}: IProps) {
  return (
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
      <Stack gap={1}>
        <Typography variant="h6"> {username}</Typography>
        <Typography variant="bodyTextSmall" color="gray.dark">
          {email}
        </Typography>
      </Stack>
    </Stack>
  );
}

UserProfileDetails.defaultProps = {
  src: '',
  alt: '',
  className: '',
  avatarStyle: {},
  email: '',
};
