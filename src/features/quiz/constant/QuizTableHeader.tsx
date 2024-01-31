import { ITableColumn } from 'shared/interfaces/misc';

export const QUIZ_COLUMNS: readonly ITableColumn[] = [
  { id: 'metaData', label: ' ' },
  { id: 'title', label: 'Title' },
  { id: 'questions', label: 'Questions' },
  { id: 'dateTime', label: 'Date & Time' },
  { id: 'category', label: 'Category' },
  { id: 'winners', label: 'Winners' },
  { id: 'status', label: 'Status' },
  { id: 'createdBy', label: 'Created by' },
  { id: 'action', label: '', align: 'right' },
];
