import { Box, CircularProgress } from '@mui/material';

export function DialogLoader() {
  return (
    <Box
      width="100%"
      height="40vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={0}
    >
      <CircularProgress />
    </Box>
  );
}
