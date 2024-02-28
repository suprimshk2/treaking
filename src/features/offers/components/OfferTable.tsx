import React, { useEffect } from 'react';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BsChevronRight } from 'react-icons/bs';
import { TableEmptyResult } from 'shared/components/display/TableEmptyResult';
import { TableLoader } from 'shared/components/display/TableLoader';
import { ITableColumn } from 'shared/interfaces/misc';
import { useBoundStore } from 'shared/stores/useBoundStore';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { SortOrder } from 'shared/enums';
import { SortIcon } from 'shared/components/display/SortIcon';
import { formatSortParam } from 'shared/utils/misc';

import { useInfiniteOffersQuery } from '../queries';
import { MemoizedOfferTableRow } from './OfferTableRow';
import { OfferSortBy } from '../enums';

const COLUMNS: readonly ITableColumn[] = [
  { id: 'vendor', label: 'Vendor', maxWidth: 100, minWidth: 100 },
  { id: 'title', label: 'Title', maxWidth: 100, minWidth: 100 },
  { id: 'dateTime', label: 'Date & Time', maxWidth: 100, minWidth: 100 },
  { id: 'description', label: 'Description', maxWidth: 300, minWidth: 300 },
  { id: 'status', label: 'Status' },
  {
    id: 'updatedBy ',
    label: 'Updated by',
    minWidth: 150,
    sortBy: OfferSortBy.DATE_ADDED,
  },
  { id: 'action', label: '', align: 'right' },
];

interface IProps {
  onEditClick: (id: string) => void;
}

export function OfferTable({ onEditClick }: IProps) {
  const filters = useBoundStore.use.offerTableFilters();
  const sort = useBoundStore.use.offerSort();
  const changeSortByAndOrder = useBoundStore.use.changeOfferSortByAndOrder();
  const resetAllFilters = useBoundStore.use.resetAllOfferTableFilters();
  const totalOffers = useBoundStore.use.totalOffers();
  const { sortBy, sortOrder } = sort;

  useEffect(() => {
    return () => {
      resetAllFilters();
    };
  }, [resetAllFilters]);

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteOffersQuery({
    ...filters,
    ...formatSortParam({ sortBy, sortOrder }),
  });

  const getColumnSortType = (column: OfferSortBy) => {
    if (sortBy !== column) {
      return '';
    }
    if (sortOrder === SortOrder.ASC) {
      return SortOrder.ASC;
    }
    return SortOrder.DESC;
  };

  const handleChangeSortOrder = (column: OfferSortBy) => {
    const existingSortOrder = getColumnSortType(column);

    let newSortOrder = '';
    if (existingSortOrder === '' || existingSortOrder === SortOrder.DESC) {
      newSortOrder = SortOrder.ASC;
    } else if (existingSortOrder === SortOrder.ASC) {
      newSortOrder = SortOrder.DESC;
    }
    changeSortByAndOrder({
      sortBy: column,
      sortOrder: newSortOrder as SortOrder,
    });
  };

  const renderedTableRows =
    isSuccess &&
    data.pages.map((group, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={i}>
        {group.rows.map((offer) => (
          <MemoizedOfferTableRow
            key={offer.offerId}
            data={offer}
            onEditClick={onEditClick}
          />
        ))}
      </React.Fragment>
    ));

  const isEmptyResult = isSuccess && totalOffers === 0;

  const tableMaxHeight = hasNextPage
    ? 'calc(100vh - 261px)'
    : 'calc(100vh - 165px)';

  return (
    <>
      <TableContainer
        sx={{
          minHeight: tableMaxHeight,
          maxHeight: tableMaxHeight,
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead className="filled sizeMedium">
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    cursor: column.sortBy ? 'pointer' : 'inherit',
                  }}
                  onClick={() => {
                    if (column.sortBy)
                      handleChangeSortOrder(column.sortBy as OfferSortBy);
                  }}
                >
                  <Stack direction="row" alignItems="center">
                    {column.label}
                    {!!column.sortBy && (
                      <SortIcon
                        data-cy="offer-sort-name"
                        type={getColumnSortType(column.sortBy as OfferSortBy)}
                      />
                    )}
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && <TableLoader cols={COLUMNS.length} />}
            {renderedTableRows}
            {isEmptyResult && <TableEmptyResult cols={COLUMNS.length} />}
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
