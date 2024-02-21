import { ITableColumn } from 'shared/interfaces/misc';

export const PRODUCT_COLUMNS: readonly ITableColumn[] = [
  { id: 'name', label: 'Name' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'point', label: 'Points' },
  { id: 'price', label: 'Price' },
  { id: 'status', label: 'Status' },
  { id: 'updatedBy', label: 'Updated by' },
  { id: 'menu', label: '' },
];
