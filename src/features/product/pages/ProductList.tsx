import { Box, useTheme } from '@mui/material';

import { useState } from 'react';

import useDisclosure from 'shared/hooks/useDisclosure';
// import { RolesAddEditModal } from 'features/settings/roles-and-permissions/components/RolesAddEditModal';
import { useNavigate } from 'react-router-dom';

import { ProductTableBanner } from '../components/ProductTableBanner';
import { ProductAddEdit } from './ProductAddEdit';
import ProductTable from '../components/ProductTable';

export function ProductList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
  const { onOpen, isOpen, onClose } = useDisclosure();
  // const onEditClick = (id: string) => {
  //   onOpen();
  //   setRoleId(id);
  // };
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
