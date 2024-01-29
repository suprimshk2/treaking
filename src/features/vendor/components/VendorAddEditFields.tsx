import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import FormInput from 'shared/components/form/FormInput';
import { SETTINGS_BAR_PROPERTY } from 'shared/constants/settings';

import FileDropzone from 'shared/components/file-upload/FileUpload';
import { config } from 'shared/constants/config';
import { IFileSchema } from '../interfaces';

export function VendorAddEditFields({
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
            <Box paddingY={theme.spacing(3)}>
              <FileDropzone
                maxSize={config.MAX_FILE_SIZE}
                onChange={onFileChange}
              />
            </Box>
            <Grid item spacing={4} mb={theme.spacing(3)}>
              <FormInput
                name="businessName"
                id="businessName"
                label="Business Name"
              />
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput
                  name="contactsOne"
                  id="contactsOne"
                  label="Primary Contact *"
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  name="contactsTwo"
                  id="contactsTwo"
                  label="Secondary Contact"
                />
              </Grid>
            </Grid>

            <Grid item spacing={4} mb={theme.spacing(3)}>
              <FormInput name="email" id="email" label="Email" />
            </Grid>
            <Grid item spacing={4} mb={theme.spacing(3)}>
              <FormInput name="address" id="address" label="Address" />
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput
                  name="facebook"
                  id="facebook"
                  label="Facebook link"
                />
              </Grid>
              <Grid item xs={6}>
                <FormInput
                  name="instagram"
                  id="instagram"
                  label="Instagram link"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput name="website" id="website" label="Website" />
              </Grid>
              <Grid item xs={6}>
                <FormInput name="youtube" id="youtube" label="Youtube" />
              </Grid>
            </Grid>
            <Grid item spacing={4} mb={theme.spacing(3)}>
              <FormInput
                name="description"
                id="description"
                label="Description"
                multiline
              />
            </Grid>
            <Grid item xs={6} mb={theme.spacing(3)}>
              <FormInput
                name="accountOwner"
                id="accountOwner"
                label="Account Manager"
              />
            </Grid>
            <Grid container xs={6} mb={theme.spacing(3)}>
              <Typography variant="bodyTextMedium">Contact Person</Typography>
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput name="fullName" id="fullName" label="Full Name" />
              </Grid>
              <Grid item xs={6}>
                <FormInput name="phone" id="phone" label="Phone" />
              </Grid>
            </Grid>
            <Grid item xs={6} mb={theme.spacing(3)}>
              <FormInput name="vendorEmail" id="vendorEmail" label="Email" />
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

VendorAddEditFields.defaultProps = {
  // setSelectedFiles: () => {},
  // isEditMode: false,
};
