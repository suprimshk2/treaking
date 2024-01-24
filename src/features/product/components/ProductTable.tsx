import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { TableLoader } from 'shared/components/display/TableLoader';
import { TableEmptyResult } from 'shared/components/display/TableEmptyResult';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useInfiniteRolesQuery } from 'features/settings/roles-and-permissions/queries';
import { VENDOR_COLUMNS } from '../constant/VendorTableHeader';

function ProductTable() {
  const filters = useBoundStore.use.roleTableFilters();
  const totalRoles = useBoundStore.use.totalRoles();
  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useInfiniteRolesQuery(filters);
  const isEmptyResult = isSuccess && totalRoles === 0;

  return (
    <TableContainer>
      <Table size="small" className="with-border">
        <TableHead className="filled sizeMedium">
          <TableRow>
            {VENDOR_COLUMNS.map((column) => (
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
          {isInitialLoading && <TableLoader cols={VENDOR_COLUMNS.length} />}
          {/* {renderedTableRows} */}
          {isEmptyResult && <TableEmptyResult cols={VENDOR_COLUMNS.length} />}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductTable;
