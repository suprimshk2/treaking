import { Box, useTheme } from '@mui/material';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import useDisclosure from 'shared/hooks/useDisclosure';
import VendorTable from '../components/VendorTable';
import { VendorTableBanner } from '../components/VendorTableBanner';
import { VendorAddEdit } from './VendorAddEdit';
import { useBoundStore } from 'shared/stores/useBoundStore';

export function VendorList() {
  const theme = useTheme();
  const [vendorId, setVendorId] = useState('');
  const { onOpen, isOpen, onClose } = useDisclosure();
  const resetVendorFilter = useBoundStore().resetVendorTableFilters;
  const onEditClick = (id: string) => {
    onOpen();
    setVendorId(id);
  };
  const onCloseClick = () => {
    setVendorId('');
    onClose();
  };
  useEffect(() => {
    return () => {
      resetVendorFilter();
    };
  }, []);
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
