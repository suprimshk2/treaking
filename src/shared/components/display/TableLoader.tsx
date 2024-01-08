import { Box, CircularProgress, TableCell, TableRow } from '@mui/material';

interface IProps {
  cols: number;
}

export function TableLoader({ cols }: IProps) {
  return (
    <TableRow>
      <TableCell colSpan={cols} sx={{ borderBottom: 'none' }}>
        <Box
          width="100%"
          height="30vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={0}
        >
          <CircularProgress />
        </Box>
      </TableCell>
    </TableRow>
  );
}
