import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import FormInput from 'shared/components/form/FormInput';
import { SETTINGS_BAR_PROPERTY } from 'shared/constants/settings';
import { useFormContext } from 'react-hook-form';
import FileDropzone, {
  IFileRef,
} from 'shared/components/file-upload/FileUpload';
import { config } from 'shared/constants/config';
import { ICloudFile, IFilePayload } from 'features/product/interfaces';
import { CloudFileCategory } from 'shared/enums';
import { useUploadImageMutation } from 'shared/mutation';
import { useRef } from 'react';
import { FormMaskedPhoneInput } from 'shared/components/form/FormMaskedPhoneInput';
import { FormUserSelect } from 'shared/components/form/FormUserSelect';
import { FormDatePicker } from 'shared/components/form/FormDatePicker';
import TextEditor from 'shared/components/text-editor';

export function VendorAddEditFields() {
  const ref = useRef<IFileRef>(null);
  const theme = useTheme();
  const uploadImageMutation = useUploadImageMutation();
  const { HEADER_HEIGHT } = SETTINGS_BAR_PROPERTY;
  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.common.white,
    px: 4,
    borderRadius: 1,
    height: '100%',
  };
  const { getValues, setValue } = useFormContext();

  const onFileChange = (files: IFilePayload[]) => {
    files.forEach(async (item) => {
      const payload: ICloudFile = {
        file: item.file,
        category: CloudFileCategory.VENDORS_LOGO,
      };

      try {
        const data = await uploadImageMutation.mutateAsync(payload);

        const images = getValues('images');

        setValue('images', [...images, { url: data?.data?.url ?? '' }]);

        ref.current?.setFileState(item.fileId, data?.data?.url, false, true);
      } catch (error) {
        ref.current?.setFileState(item.fileId, '', false, false);
      }
    });
  };
  return (
    <Box width="100%" height="100%">
      <Box sx={childrenContainerStyle}>
        <Stack
          px={4}
          spacing={4}
          maxWidth={600}
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
                isMultiImage={false}
              />
            </Box>
            <Grid item spacing={4} mb={theme.spacing(3)}>
              <FormInput
                name="businessName"
                id="businessName"
                label="Business Name*"
              />
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormMaskedPhoneInput
                  name="contactsOne"
                  id="contactsOne"
                  label="Primary Number* "
                />
              </Grid>
              <Grid item xs={6}>
                <FormMaskedPhoneInput
                  name="contactsTwo"
                  id="contactsTwo"
                  label="Secondary Number "
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
                <FormInput name="facebook" id="facebook" label="Facebook" />
              </Grid>
              <Grid item xs={6}>
                <FormInput name="instagram" id="instagram" label="Instagram" />
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
              <TextEditor
                name="description"
                label="Description *"
                height={200}
              />
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6} mb={theme.spacing(3)}>
                {/* <FormInput
                name="accountOwner"
                id="accountOwner"
                label="Account Owner*"
              /> */}

                <FormUserSelect
                  name="accountOwner"
                  id="accountOwner"
                  label="Account Manager*"
                />
              </Grid>
              <Grid item xs={6}>
                <FormDatePicker name={'enrolledDate'} label="Enrolled Date" />
              </Grid>
            </Grid>
            <Grid container xs={6} mb={theme.spacing(3)}>
              <Typography variant="bodyTextMedium">Contact Person</Typography>
            </Grid>
            <Grid container spacing={4} mb={theme.spacing(3)}>
              <Grid item xs={6}>
                <FormInput name="fullName" id="fullName" label="Full Name*" />
              </Grid>
              <Grid item xs={6}>
                <FormMaskedPhoneInput name="phone" id="phone" label="Phone" />
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
