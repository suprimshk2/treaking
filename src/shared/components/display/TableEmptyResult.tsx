import { Box, TableCell, TableRow, Typography } from '@mui/material';

interface IProps {
  cols: number;
  text?: string;
}

export function TableEmptyResult({ cols, text }: IProps) {
  return (
    <TableRow className="no-hover">
      <TableCell
        colSpan={cols}
        sx={{
          borderBottom: 'none',
          backgroundColor: (theme) => theme.palette.gray.lighter,
        }}
      >
        <Box
          width="100%"
          height={40}
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={0}
        >
          <Typography variant="bodyTextMedium" color="gray.main">
            {text}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}

TableEmptyResult.defaultProps = {
  text: 'No Result Found.',
};
