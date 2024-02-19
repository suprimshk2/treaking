import { Box, Grid, Stack, useTheme } from '@mui/material';
import FormInput from 'shared/components/form/FormInput';

import TextEditor from 'shared/components/text-editor';
import { FormVendorSelect } from '../../../shared/select/VendorSelect';
import useResetProductField from '../hooks/useResetProductField';
import { useProductDetailQuery } from '../queries';

export function ProductAddEditFields({
  editProductId,
}: {
  editProductId: string;
}) {
  const theme = useTheme();

  const productDetailQuery = useProductDetailQuery(editProductId ?? '', {
    enabled: !!editProductId,
  });

  useResetProductField(productDetailQuery?.data);

  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.gray.lighter,
    p: 4,
    borderRadius: 1,
    height: '100%',
  };

  return (
    <Box width="100%" height="100%">
      <Box sx={childrenContainerStyle}>
        <Stack
          p={4}
          spacing={4}
          mx="auto"
          sx={{
            borderRadius: 2,
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Box>
            <Grid item spacing={4} mb={theme.spacing(3)}>
              <FormVendorSelect
                name="vendor"
                id="vendor"
                label="Vendor *"
                clearable
              />
            </Grid>
            <Grid item spacing={4} mb={theme.spacing(3)}>
              <FormInput name="title" id="title" label="Product Title" />
            </Grid>
            <Grid item spacing={4} mb={theme.spacing(3)}>
              <TextEditor name="description" label="Description *" />
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput
                  name="quantityInStock"
                  id="quantity"
                  label="Quantity *"
                  type="number"
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  name="point"
                  id="point"
                  label="Product Points *"
                  type="number"
                  inputProps={{ min: 1 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput
                  name="price"
                  id="price"
                  label="Selling Price *"
                  type="number"
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  name="discount"
                  id="discountPrice"
                  label="Discounted Price"
                  type="number"
                  inputProps={{ min: 1 }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput
                  name="retailPrice"
                  id="retailPrice"
                  label="Retail Price *"
                  type="number"
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  name="costPrice"
                  id="costPrice"
                  label="Cost Price *"
                  type="number"
                  inputProps={{ min: 1 }}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

ProductAddEditFields.defaultProps = {
  // setSelectedFiles: () => {},
  // isEditMode: false,
};
