import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import layoutConstants from 'shared/constants/layout';

const { HEADER_HEIGHT } = layoutConstants;

function NoPermission() {
  return (
    <Box
      width="100%"
      height={`calc(100vh - ${HEADER_HEIGHT} - 32px)`}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography mb={6} ml={5} color="gray.main" variant="bodyTextMedium">
        You do not have permissions to access this page
      </Typography>
    </Box>
  );
}

export default NoPermission;
