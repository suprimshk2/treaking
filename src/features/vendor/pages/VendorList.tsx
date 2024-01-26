import { Box, useTheme } from '@mui/material';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import useDisclosure from 'shared/hooks/useDisclosure';
import VendorTable from '../components/VendorTable';
import { VendorTableBanner } from '../components/VendorTableBanner';
import { VendorAddEdit } from './VendorAddEdit';

export function VendorList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [vendorId, setVendorId] = useState('');
  const { onOpen, isOpen, onClose } = useDisclosure();

  const onEditClick = (id: string) => {
    onOpen();
    setVendorId(id);
  };
  const onCloseClick = () => {
    setVendorId('');
    onClose();
  };
  return (
    <Box pb={2}>
      <Box sx={{ paddingX: theme.spacing(4) }}>
        <VendorTableBanner onAddClick={() => onOpen()} />
        <VendorTable onEditClick={onEditClick} />
        {isOpen && (
          <VendorAddEdit editVendorId={vendorId} onClose={onCloseClick} />
        )}
      </Box>
    </Box>
  );
}
