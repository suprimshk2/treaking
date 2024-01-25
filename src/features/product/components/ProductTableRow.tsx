import { TableCell, TableRow, Typography, useTheme } from '@mui/material';
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
        <Typography
          bgcolor={
            item.isInStock
              ? theme.palette.success.main
              : theme.palette.error.main
          }
          textAlign="center"
          color={theme.palette.common.white}
          fontWeight="medium"
          borderRadius={4}
          p={1}
        >
          {item.status}
        </Typography>
      </TableCell>
      <TableCell>{item.createdBy}</TableCell>
    </TableRow>
  );
}

export default ProductTableRow;
