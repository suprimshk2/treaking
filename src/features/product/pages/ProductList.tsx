import { Box, useTheme } from '@mui/material';

import { useState } from 'react';

import useDisclosure from 'shared/hooks/useDisclosure';
import ProductTable from '../components/ProductTable';
import { ProductTableBanner } from '../components/ProductTableBanner';
import { ProductAddEditModal } from '../components/ProductAddEditModal';

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
          <ProductAddEditModal
            editProductId={productId}
            onClose={onCloseClick}
          />
        )}
      </Box>
    </Box>
  );
}
