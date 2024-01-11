import { useEffect, useState } from 'react';
import useDisclosure from 'shared/hooks/useDisclosure';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { Box, useTheme } from '@mui/material';
import { UserAddEditModal } from '../components/UserAddEditModal';
import { UserTable } from '../components/UserTable';
import { UserTableBanner } from '../components/UserTableBanner';

function UserList() {
  const resetUserTableFilters = useBoundStore.use.resetUserTableFilters();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const theme = useTheme();
  // User Id set for editing/deleting (Can this be included in the `useDisclosure` hook and the extra state be removed?)
  const [userId, setUserId] = useState('');

  const onEditClick = (id: string) => {
    setUserId(id);
    onOpen();
  };

  const onCloseClick = () => {
    setUserId('');
    onClose();
  };

  useEffect(() => {
    return () => {
      resetUserTableFilters();
    };
  }, [resetUserTableFilters]);

  return (
    <Box px={theme.spacing(40)}>
      <UserTableBanner onAddClick={() => onOpen()} />
      <UserTable onEditClick={onEditClick} />
      {isOpen && (
        <UserAddEditModal editUserId={userId} onClose={onCloseClick} />
      )}
    </Box>
  );
}

export default UserList;
