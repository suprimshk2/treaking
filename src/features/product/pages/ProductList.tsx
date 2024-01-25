import { Box, useTheme } from '@mui/material';

import { useState } from 'react';

import useDisclosure from 'shared/hooks/useDisclosure';
// import { RolesAddEditModal } from 'features/settings/roles-and-permissions/components/RolesAddEditModal';
import ProductTable from '../components/ProductTable';
import { ProductTableBanner } from '../components/ProductTableBanner';
import { ProductAddEdit } from './ProductAddEdit';

export function ProductList() {
  const theme = useTheme();
  const [productId, setProductId] = useState('');
  const { onOpen, isOpen, onClose } = useDisclosure();

  const onCloseClick = () => {
    setProductId('');
    onClose();
  };

  return (
    <Box pb={2}>
      <Box sx={{ paddingX: theme.spacing(4) }}>
        <ProductTableBanner onAddClick={() => onOpen()} />
        <ProductTable />
        {isOpen && (
          <ProductAddEdit editProductId={productId} onClose={onCloseClick} />
        )}
      </Box>
    </Box>
  );
}
