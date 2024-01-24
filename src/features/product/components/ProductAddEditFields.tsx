import { Box, Grid, Stack, useTheme } from '@mui/material';
import FormInput from 'shared/components/form/FormInput';
import { SETTINGS_BAR_PROPERTY } from 'shared/constants/settings';

import FileDropzone from 'shared/components/file-upload/FileUpload';
import { config } from 'shared/constants/config';
import { IFileSchema } from '../interfaces';
import { FormVendorSelect } from './VendorSelect';

export function ProductAddEditFields({
  setSelectedFiles,
}: {
  setSelectedFiles: any;
}) {
  const theme = useTheme();

  const { HEADER_HEIGHT } = SETTINGS_BAR_PROPERTY;
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
    const data = files.map((e: IFileSchema) => {
      const { error, ...rest } = e;
      return rest;
    });
    setSelectedFiles(data);
  };
  return (
    <Box
      width="100%"
      height="100%"
      // sx={{
      //   backgroundColor: 'red',
      // }}
    >
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
              />
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput name="quality" id="quality" label="Quality" />
              </Grid>
              <Grid item xs={6}>
                <FormInput name="point" id="point" label="Product Points" />
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput name="price" id="price" label="Selling Price" />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  name="discountPrice"
                  id="discountPrice"
                  label="Discounted Price"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput
                  name="retailPrice"
                  id="retailPrice"
                  label="Retail Price"
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
