import { Box, Typography } from '@mui/material';

import layoutConstants from 'shared/constants/layout';

const { HEADER_HEIGHT } = layoutConstants;

function Dashboard() {
  return (
    <Box
      width="100%"
      height={`calc(100vh - ${HEADER_HEIGHT} - 32px)`}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="bodyTextLargeMd">TEST</Typography>
    </Box>
  );
}

export default Dashboard;
