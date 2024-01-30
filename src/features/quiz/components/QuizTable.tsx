import {
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
import { QUIZ_COLUMNS } from '../constant/QuizTableHeader';
import { useInfiniteQuizQuery } from '../queries';
import { MemoizedQuizTableRow } from './MemorizedQuizTableRow';

interface IProps {
  onEditClick: (id: string) => void;
  onDuplicate: (id: string) => void;
}
function QuizTable({ onEditClick, onDuplicate }: IProps) {
  const filters = useBoundStore.use.quizTableFilters();
  const { data, isSuccess, isInitialLoading } = useInfiniteQuizQuery(filters);

  const isEmptyResult = isSuccess && data?.pages?.[0]?.count === 0;
  const renderedTableRows =
    isSuccess &&
    data.pages.map((group, i) => (
      <React.Fragment key={i}>
        {group.rows.map((quiz) => (
          <MemoizedQuizTableRow
            key={quiz._id}
            data={quiz}
            onEditClick={onEditClick}
            onDuplicate={onDuplicate}
          />
        ))}
      </React.Fragment>
    ));

  return (
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
  );
}

export default QuizTable;
