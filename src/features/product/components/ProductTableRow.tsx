import { Chip, TableCell, TableRow, Typography, useTheme } from '@mui/material';
import { IAdaptedProductTableRow } from '../interfaces';

function ProductTableRow({ item }: { item: IAdaptedProductTableRow }) {
  const theme = useTheme();
  return (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.quantityInStock}</TableCell>
      <TableCell>{item.point}</TableCell>
      <TableCell>{item.price}</TableCell>
      <TableCell>
        <Chip
          label={item.status}
          sx={{
            color: theme.palette.common.white,
            bgcolor: item.isInStock
              ? theme.palette.success.main
              : theme.palette.error.main,
          }}
        />
      </TableCell>
      <TableCell>{item.createdBy}</TableCell>
    </TableRow>
  );
}

export default ProductTableRow;
