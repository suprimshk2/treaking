import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { TableEmptyResult } from 'shared/components/display/TableEmptyResult';
import { LoadingIndicator } from 'shared/components/display/LoadingIndicator';
import { useProductsQuery } from '../queries';
import ProductTableRow from './ProductTableRow';
import { IAdaptedProductTableRow } from '../interfaces';
import { PRODUCT_COLUMNS } from '../constant/ProducTableHeader';

function ProductTable() {
  const { data, isLoading, isSuccess } = useProductsQuery(
    { limit: 10 },
    { enabled: true }
  );

  const isEmptyResult = isSuccess && data?.count === 0;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <TableContainer>
      <Table size="small" className="with-border">
        <TableHead className="filled sizeMedium">
          <TableRow>
            {PRODUCT_COLUMNS.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                sx={{ minWidth: column.minWidth, width: column.width }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {isInitialLoading && <TableLoader cols={VENDOR_COLUMNS.length} />} */}
          {data?.rows?.map((item: IAdaptedProductTableRow) => (
            <ProductTableRow item={item} key={item.id} />
          ))}
          {isEmptyResult && <TableEmptyResult cols={PRODUCT_COLUMNS.length} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
