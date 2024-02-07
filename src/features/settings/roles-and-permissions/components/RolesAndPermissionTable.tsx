import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ITableColumn } from 'shared/interfaces/misc';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsChevronRight } from 'react-icons/bs';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { TableLoader } from 'shared/components/display/TableLoader';
import { TableEmptyResult } from 'shared/components/display/TableEmptyResult';
import { MemoizedRolesAndPermissionsTableRow } from './RolesAndPermissionTableRow';
import { useInfiniteRolesQuery } from '../queries';
import { RolesCode } from '../enums';

const COLUMNS: readonly ITableColumn[] = [
  { id: 'name', label: 'Name' },
  { id: 'permissions', label: 'Permissions' },
  { id: 'date', label: 'Last Updated' },
  { id: 'action', label: '', align: 'right' },
];

interface IProps {
  onEditClick: (id: string) => void;
}

export default function RolesAndPermissionTable({ onEditClick }: IProps) {
  const filters = useBoundStore.use.roleTableFilters();
  const totalRoles = useBoundStore.use.totalRoles();

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteRolesQuery(filters);

  const renderedTableRows =
    isSuccess &&
    data.pages.map((group, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={i}>
        {/* NOTE: Filtering Super-Admin from roles list. */}
        {group.rows
          ?.filter((result) => result.code !== RolesCode.SUPER_ADMIN)
          .map((result) => (
            <MemoizedRolesAndPermissionsTableRow
              data={result}
              key={result._id}
              onEditClick={onEditClick}
            />
          ))}
      </React.Fragment>
    ));

  const isEmptyResult = isSuccess && totalRoles === 0;

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
                  sx={{ minWidth: column.minWidth, width: column.width }}
                >
                  {column.label}
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
        <Box mt={4} display="flex" justifyContent="center">
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
