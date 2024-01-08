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
import React, { useEffect } from 'react';
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
import socket from 'shared/utils/socket';

import { useInfiniteUsersQuery } from '../queries';
import { MemoizedUserTableRow } from './UserTableRow';
import { UserSortBy } from '../enum';

const COLUMNS: readonly ITableColumn[] = [
  { id: 'name', label: 'Name', minWidth: 100, sortBy: UserSortBy.FULLNAME },
  { id: 'useRole', label: 'Role' },
  { id: 'email', label: 'Email', sortBy: UserSortBy.EMAIL },
  { id: 'phone', label: 'Phone' },
  { id: 'lastUpdated', label: 'Last Updated', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 80 },
  { id: 'action', label: '', align: 'right' },
];

interface IProps {
  onEditClick: (id: string) => void;
}

export function UserTable({ onEditClick }: IProps) {
  const filters = useBoundStore.use.userTableFilters();
  const sort = useBoundStore.use.userSort();
  const changeSortByAndOrder = useBoundStore.use.changeUserSortByAndOrder();
  const totalUsers = useBoundStore.use.totalUsers();
  const { sortBy, sortOrder } = sort;

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useInfiniteUsersQuery({
    ...filters,
    ...formatSortParam({ sortBy, sortOrder }),
  });

  const getColumnSortType = (column: UserSortBy) => {
    if (sortBy !== column) {
      return '';
    }
    if (sortOrder === SortOrder.ASC) {
      return SortOrder.ASC;
    }
    return SortOrder.DESC;
  };

  const handleChangeSortOrder = (column: UserSortBy) => {
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
        {group.rows.map((user) => (
          <MemoizedUserTableRow
            key={user._id}
            data={user}
            onEditClick={onEditClick}
          />
        ))}
      </React.Fragment>
    ));

  const isEmptyResult = isSuccess && totalUsers === 0;

  return (
    <>
      <TableContainer>
        <Table size="small" className="with-border">
          <TableHead className="filled sizeMedium">
            <TableRow>
              {COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    cursor: column.sortBy ? 'pointer' : 'inherit',
                  }}
                  onClick={() => {
                    if (column.sortBy)
                      handleChangeSortOrder(column.sortBy as UserSortBy);
                  }}
                >
                  <Stack direction="row" alignItems="center">
                    {column.label}
                    {!!column.sortBy && (
                      <SortIcon
                        data-cy="user-sort-name"
                        type={getColumnSortType(column.sortBy as UserSortBy)}
                      />
                    )}
                  </Stack>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isInitialLoading && <TableLoader cols={COLUMNS.length} />}
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
