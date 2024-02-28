import { Box, useTheme } from '@mui/material';
import ProductTable from '../components/ProductTable';
import { ProductTableBanner } from '../components/ProductTableBanner';

import { useNavigate } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';
import { useEffect } from 'react';
import { useBoundStore } from 'shared/stores/useBoundStore';

export function ProductList() {
  const theme = useTheme();
  const navigate = useNavigate();
  const resetProductFilter = useBoundStore().resetProductTableFilters;
  const onEditClick = (id: string) => {
    navigate(`${uiRoute.addProduct}?type=update-product&id=${id}`);
  };
  useEffect(() => {
    return () => {
      resetProductFilter();
    };
  }, []);
  return (
    <Box pb={2}>
      <Box sx={{ paddingX: theme.spacing(4) }}>
        <ProductTableBanner
          onAddClick={() =>
            navigate(`${uiRoute.addProduct}?type=create-product`)
          }
        />
        <ProductTable onEditClick={onEditClick} />
      </Box>
    </Box>
  );
}
