import { Box, useTheme } from '@mui/material';
import ProductTable from '../components/ProductTable';
import { ProductTableBanner } from '../components/ProductTableBanner';

import { useNavigate } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';

export function ProductList() {
  const theme = useTheme();
  const navigate = useNavigate();

  const onEditClick = (id: string) => {
    navigate(`${uiRoute.addProduct}?type=update-product&id=${id}`);
  };
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
