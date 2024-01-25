import { Box, Grid, Stack, useTheme } from '@mui/material';
import FormInput from 'shared/components/form/FormInput';

import FileDropzone from 'shared/components/file-upload/FileUpload';
import { config } from 'shared/constants/config';
import { useFormContext } from 'react-hook-form';
import { IFileSchema } from '../interfaces';
import { FormVendorSelect } from './VendorSelect';

export function ProductAddEditFields() {
  const theme = useTheme();
  const { setValue } = useFormContext();

  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.gray.lighter,
    p: 4,
    borderRadius: 1,
    height: '100%',
  };

  const onFileChange = (files: IFileSchema[]) => {
    if (files[0]?.error) {
      return;
    }
    const images = files.map((e: IFileSchema) => {
      const { error, ...rest } = e;
      return rest;
    });

    setValue('images', images);
  };

  return (
    <Box width="100%" height="100%">
      <Box sx={childrenContainerStyle}>
        <Stack
          p={4}
          spacing={4}
          maxWidth={518}
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
                label="Vendor"
                clearable
              />
            </Grid>
            <Grid item spacing={4} mb={theme.spacing(3)}>
              <FormInput name="title" id="title" label="Product Title" />
            </Grid>
            <Grid item spacing={4} mb={theme.spacing(3)}>
              <FormInput
                name="description"
                id="description"
                label="Product Description"
                multiline
                rows={3}
              />
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput
                  name="quantityInStock"
                  id="quantity"
                  label="Quantity"
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  name="point"
                  id="point"
                  label="Product Points"
                  type="number"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput
                  name="price"
                  id="price"
                  label="Selling Price"
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  name="discountPrice"
                  id="discountPrice"
                  label="Discounted Price"
                  type="number"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput
                  name="retailPrice"
                  id="retailPrice"
                  label="Retail Price"
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput name="costPrice" id="costPrice" label="Cost Price" />
              </Grid>
            </Grid>
            <Box paddingY={theme.spacing(3)}>
              <FileDropzone
                maxSize={config.MAX_FILE_SIZE}
                onChange={onFileChange}
              />
            </Box>
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
