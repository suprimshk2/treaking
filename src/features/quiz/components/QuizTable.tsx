import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { TableEmptyResult } from 'shared/components/display/TableEmptyResult';
import { useBoundStore } from 'shared/stores/useBoundStore';

import { TableLoader } from 'shared/components/display/TableLoader';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { QUIZ_COLUMNS } from '../constant/QuizTableHeader';
import { useInfiniteQuizQuery } from '../queries';
import { MemoizedQuizTableRow } from './MemorizedQuizTableRow';

interface IProps {
  onEditClick: (id: string) => void;
  onDuplicate: (id: string) => void;
}
function QuizTable({ onEditClick, onDuplicate }: IProps) {
  const filters = useBoundStore.use.quizTableFilters();
  const setQuizFilters = useBoundStore.use.setQuizTableFilters();
  const { data, isSuccess, isInitialLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuizQuery(filters);
  const isEmptyResult = isSuccess && data?.pages?.[0]?.count === 0;
  const renderedTableRows =
    isSuccess &&
    data?.pages?.map((group, i) => (
      <React.Fragment key={i}>
        {group?.rows?.map((quiz) => (
          <MemoizedQuizTableRow
            key={quiz._id}
            data={quiz}
            onEditClick={onEditClick}
            onDuplicate={onDuplicate}
          />
        ))}
      </React.Fragment>
    ));

  function fetchNextPage(): void {
    setQuizFilters({
      ...filters,
      page: (filters.page ?? 0) + 1,
    });
  }
  return (
    <>
      <TableContainer>
        <Table size="small" className="with-border">
          <TableHead className="filled sizeMedium">
            <TableRow>
              {QUIZ_COLUMNS.map((column) => (
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
            {isInitialLoading && <TableLoader cols={QUIZ_COLUMNS.length} />}
            {renderedTableRows}
            {isEmptyResult && <TableEmptyResult cols={QUIZ_COLUMNS.length} />}
          </TableBody>
        </Table>
      </TableContainer>
      {hasNextPage && (
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            buttonType={ButtonType.LOADING}
            // suffix={<BsChevronRight />}
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

export default QuizTable;
