import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BsChevronRight } from 'react-icons/bs';
import React from 'react';
import { TableLoader } from 'shared/components/display/TableLoader';
import { TableEmptyResult } from 'shared/components/display/TableEmptyResult';
import { useBoundStore } from 'shared/stores/useBoundStore';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { VENDOR_COLUMNS } from '../constant/VendorTableHeader';
import { MemoizedVendorTableRow } from './MemorizedVendorTableRow';
import { useInfiniteVendorQuery } from '../queries';

interface IProps {
  onEditClick: (id: string) => void;
}
function VendorTable({ onEditClick }: IProps) {
  const filters = useBoundStore.use.vendorTableFilters();

  // const totalRoles = useBoundStore.use.totalRoles();
  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteVendorQuery(filters);
  const isEmptyResult = isSuccess && data.pages?.[0].count === 0;

  const renderedTableRows =
    isSuccess &&
    data.pages.map((group, i) => (
      <React.Fragment key={i}>
        {group?.rows.map((vendor) => (
          <MemoizedVendorTableRow
            key={vendor._id}
            data={vendor}
            onEditClick={onEditClick}
          />
        ))}
      </React.Fragment>
    ));

  return (
    <>
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
            {isLoading && <TableLoader cols={VENDOR_COLUMNS.length} />}
            {renderedTableRows}
            {isEmptyResult && <TableEmptyResult cols={VENDOR_COLUMNS.length} />}
          </TableBody>
        </Table>
      </TableContainer>
      {hasNextPage && (
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            buttonType={ButtonType.LOADING}
            suffix={<BsChevronRight />}
            size={ButtonSize.MEDIUM}
            loading={isFetchingNextPage}
            variant={ButtonVariant.TEXT}
            onClick={() => fetchNextPage()}
          >
            Load More
          </Button>
        </Box>
      )}
    </>
  );
}

export default VendorTable;
