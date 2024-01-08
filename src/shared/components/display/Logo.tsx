import { Box, SxProps } from '@mui/material';
import FallbackLogo from '../../assets/svg/Logo.svg';

interface Props {
  alt?: string;
  sx?: SxProps;
  src?: string;
  fallbackImg?: string;
}

function Logo({ alt = 'logo', sx, src, fallbackImg }: Props) {
  return (
    <Box
      alt={alt}
      component="img"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError={(e: any) => {
        e.target.onerror = null;
        e.target.src = `${fallbackImg}`;
      }}
      src={src}
      sx={{ height: 30, width: 'auto', ...sx }}
    />
  );
}

Logo.defaultProps = {
  alt: 'logo',
  sx: {
    height: 30,
  },
  src: FallbackLogo,
  fallbackImg: FallbackLogo,
};

export default Logo;
