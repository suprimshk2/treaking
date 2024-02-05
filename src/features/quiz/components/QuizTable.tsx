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
import { BsChevronRight } from 'react-icons/bs';
import { TableLoader } from 'shared/components/display/TableLoader';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { formatSortParam } from 'shared/utils/misc';
import { QUIZ_COLUMNS } from '../constant/QuizTableHeader';
import { useInfiniteQuizQuery } from '../queries';
import { MemoizedQuizTableRow } from './MemorizedQuizTableRow';

interface IProps {
  onEditClick: (id: string) => void;
  onDuplicate: (id: string) => void;
}
function QuizTable({ onEditClick, onDuplicate }: IProps) {
  const filters = useBoundStore.use.quizTableFilters();
  const sort = useBoundStore.use.quizSort();
  const setQuizFilters = useBoundStore.use.setQuizTableFilters();
  const { sortBy, sortOrder } = sort;
  const {
    data,
    isSuccess,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuizQuery({
    ...filters,
    ...formatSortParam({ sortBy, sortOrder }),
  });
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
            {isLoading && <TableLoader cols={QUIZ_COLUMNS.length} />}
            {renderedTableRows}
            {isEmptyResult && <TableEmptyResult cols={QUIZ_COLUMNS.length} />}
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

export default QuizTable;
