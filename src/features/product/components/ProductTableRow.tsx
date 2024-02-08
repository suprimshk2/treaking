import {
  Box,
  Chip,
  Stack,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';

import EllipseMenu from 'shared/components/menu/EllipseMenu';
import EllipseMenuItem from 'shared/components/menu/EllipseMenuItem';
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';
import { useState } from 'react';
import { LoadingIndicator } from 'shared/components/display/LoadingIndicator';
import { IAdaptedProductTableRow } from '../interfaces';
import { useDeleteProductMutation } from '../mutations';
import { ProductAddEditModal } from './ProductAddEditModal';
import { checkAuthForPermissions } from 'shared/utils/common';
import { ResourceCode } from 'shared/enums';
import { productManagementPermissions } from 'features/settings/roles-and-permissions/enums';

function ProductTableRow({ item }: { item: IAdaptedProductTableRow }) {
  const theme = useTheme();
  const deleteMutation = useDeleteProductMutation();
  const [deleteItem, setDeleteItem] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

  const onClickDelete = (id: string) => {
    setDeleteItem(id);
    deleteMutation.mutate(id, {
      onSuccess() {
        setDeleteItem(null);
      },
    });
  };
  const isProductDeleteEnabled = checkAuthForPermissions(
    ResourceCode.PRODUCTS_MANAGEMENT,
    productManagementPermissions.DELETE
  );
  const isProductEditEnabled = checkAuthForPermissions(
    ResourceCode.PRODUCTS_MANAGEMENT,
    productManagementPermissions.UPDATE
  );
  const isEnable = isProductDeleteEnabled || isProductEditEnabled;
  return (
    <>
      {productId && (
        <ProductAddEditModal
          editProductId={productId}
          onClose={() => {
            setProductId(null);
          }}
        />
      )}
      <TableRow>
        <TableCell>
          <Stack direction="row" alignItems="center" gap={3}>
            <Box
              borderRadius={2}
              component="img"
              sx={{
                height: '40px',
                width: '40px',
              }}
              alt="product image"
              src={item.image_url}
            />
            {item.name}
          </Stack>
        </TableCell>
        <TableCell>{item.quantityInStock}</TableCell>
        <TableCell>{item.point}</TableCell>
        <TableCell>{item.price}</TableCell>
        <TableCell>
          <Chip
            label={item.status}
            sx={{
              color: theme.palette.common.white,
              bgcolor: item.isInStock
                ? theme.palette.success.main
                : theme.palette.error.main,
            }}
          />
        </TableCell>
        <TableCell>
          <Typography>{item.createdBy}</Typography>
          <Typography>{item.createdAt}</Typography>
        </TableCell>
        {isEnable && (
          <TableCell>
            <EllipseMenu>
              {isProductEditEnabled && (
                <EllipseMenuItem
                  text="Edit"
                  icon={FaPenAlt}
                  onClick={() => {
                    setProductId(item.productId);
                  }}
                />
              )}
              {deleteItem === item.productId ? (
                <LoadingIndicator
                  containerHeight="15px"
                  size="20px"
                  align="flex-start"
                  ml={3}
                />
              ) : (
                <EllipseMenuItem
                  text="Delete"
                  icon={FaTrashAlt}
                  onClick={() => onClickDelete(item.productId)}
                />
              )}
            </EllipseMenu>
          </TableCell>
        )}
      </TableRow>
    </>
  );
}

export default ProductTableRow;
