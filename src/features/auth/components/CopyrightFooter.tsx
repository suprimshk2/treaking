import { Stack, Typography, SxProps } from '@mui/material';
import uiRoute from 'shared/constants/uiRoute';
import Link from 'shared/theme/components/Link';

interface IProps {
  containerSx?: SxProps;
}

function CopyrightFooter({ containerSx }: IProps) {
  return (
    <Stack sx={containerSx} spacing={1}>
      <Typography variant="bodyTextLarge" textAlign="center">
        <Link to={uiRoute.index}>Terms & Conditions</Link>&nbsp;|&nbsp;
        <Link to={uiRoute.index}>Privacy Policy</Link>
      </Typography>
      <Typography variant="bodyTextLarge" textAlign="center" color="gray.dark">
        © {new Date().getFullYear()} Copyright Holista Therapy. Powered by
        Novelty Technology.
      </Typography>
    </Stack>
  );
}

CopyrightFooter.defaultProps = {
  containerSx: undefined,
};

export default CopyrightFooter;
