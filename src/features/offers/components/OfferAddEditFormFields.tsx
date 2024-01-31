import { Box, Grid, Typography, useTheme } from '@mui/material';
import FormInput from 'shared/components/form/FormInput';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormDatePicker } from 'shared/components/form/FormDatePicker';
import { FormTimePicker } from 'shared/components/form/FormTimePicker';
import { FormVendorSelect } from 'shared/select/VendorSelect';
import { OfferFormAdTemplates } from './offer-templates/OfferFormAdTemplates';
import { OfferTypeFormSelect } from './OfferTypeFormSelect';
import { OfferBodyType } from '../enums';

interface IProps {
  isEditMode?: boolean;
}

export function OfferAddEditFormFields({ isEditMode }: IProps) {
  const theme = useTheme();
  const { watch, setValue } = useFormContext();

  const bodyType = watch('bodyType');
  const body = watch('body');

  useEffect(() => {
    if (bodyType === OfferBodyType.FREE) {
      setValue('body', '');
    }
  }, [body, bodyType, setValue]);

  return (
    <Box
      sx={{
        overflow: 'auto',
      }}
    >
      <Grid container spacing={4} mb={4}>
        <Grid item xs={6}>
          <FormVendorSelect
            name="vendor"
            id="vendor"
            label="Vendor"
            clearable
            placeholder="Select vendor"
          />
        </Grid>
        <Grid item xs={6}>
          <FormInput name="manager" id="manager" label="Account Manager" />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12}>
          <OfferFormAdTemplates name="template" />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={6}>
          <FormInput
            name="title"
            id="title"
            label="Offer Title"
            inputProps={{
              maxLength: 16,
            }}
          />
        </Grid>
        <Grid item xs={6} position="relative">
          <Box
            sx={{
              position: 'absolute',
              zIndex: 2,
              top: 40,
            }}
          >
            <OfferTypeFormSelect name="bodyType" id="bodyType" width="76px" />
          </Box>
          <FormInput
            type="number"
            name="body"
            id="body"
            label="Offer Body"
            prefix={<Box ml={17} />}
            inputProps={{
              max: 999,
              min: 1,
            }}
            disabled={bodyType === OfferBodyType.FREE}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} position="relative">
          <FormInput
            name="shortDescription"
            id="highlights"
            label="Offer Highlights"
            multiline
            rows={3}
            inputProps={{
              maxLength: 100,
            }}
          />
          <Typography
            color="gray.dark"
            variant="bodyTextSmall"
            sx={{
              position: 'absolute',
              top: 20,
              right: 0,
            }}
          >
            Max 100 Characters Limit
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12}>
          <FormInput
            name="description"
            id="description"
            label="Offer Descriptions"
            multiline
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={6}>
          <FormDatePicker name="startDate" label="Start Date" />
        </Grid>
        <Grid item xs={6}>
          <FormTimePicker name="startDate" label="Start Time" />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={6}>
          <FormDatePicker name="endDate" label="End Date" />
        </Grid>
        <Grid item xs={6}>
          <FormTimePicker name="endDate" label="End Time" />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={6}>
          <FormDatePicker name="validityDate" label="Validity Date" />
        </Grid>
        <Grid item xs={6}>
          <FormTimePicker name="validityEndTime" label="End Time" />
        </Grid>
      </Grid>
    </Box>
  );
}

OfferAddEditFormFields.defaultProps = {
  isEditMode: false,
};
