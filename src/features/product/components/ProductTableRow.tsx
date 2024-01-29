import {
  Box,
  Chip,
  Stack,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';

import EllipseMenu from 'shared/components/menu/EllipseMenu';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';
import { IAdaptedProductTableRow } from '../interfaces';

function ProductTableRow({ item }: { item: IAdaptedProductTableRow }) {
  const theme = useTheme();
  return (
    <TableRow>
      <TableCell>
        <Stack direction="row" alignItems="center" gap={3}>
          <Box
            borderRadius={2}
            component="img"
            sx={{
              height: '40px',
              width: '40px',
            }}
            alt="product image"
            src={item.image_url}
          />
          {item.name}
        </Stack>
      </TableCell>
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
      <TableCell>
        <Typography>{item.createdBy}</Typography>
        <Typography>{item.createdAt}</Typography>
      </TableCell>
      <TableCell>
        <EllipseMenu>
          <EllipseMenuItem text="Edit" icon={FaPenAlt} />
          <EllipseMenuItem text="Delete" icon={FaTrashAlt} />
        </EllipseMenu>
      </TableCell>
    </TableRow>
  );
}

export default ProductTableRow;
