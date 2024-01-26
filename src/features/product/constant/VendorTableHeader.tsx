import { ITableColumn } from 'shared/interfaces/misc';

export const VENDOR_COLUMNS: readonly ITableColumn[] = [
  { id: 'name', label: 'Name' },
  { id: 'address', label: 'Address' },
  { id: 'contact', label: 'Contact' },
  { id: 'email', label: 'Email' },
  { id: 'accountManager', label: 'Account Manager' },
  { id: 'status', label: 'Status' },
  { id: 'updatedBy', label: 'Updated by' },
  { id: 'action', label: '', align: 'right' },
];
