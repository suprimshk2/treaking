import { Box, Grid, Typography } from '@mui/material';
import FormInput from 'shared/components/form/FormInput';
import { FormDatePicker } from 'shared/components/form/FormDatePicker';
import { FormTimePicker } from 'shared/components/form/FormTimePicker';
import { FormVendorSelect } from 'shared/select/VendorSelect';
import TextEditor from 'shared/components/text-editor';
import { LookUpCode } from 'shared/enums';
import { OfferFormAdTemplates } from './offer-templates/OfferFormAdTemplates';
import { OfferTypeFormSelect } from './OfferTypeFormSelect';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

export function OfferAddEditFormFields({
  isEditMode = false,
}: {
  isEditMode?: boolean;
}) {
  const { watch, setValue } = useFormContext();
  const accountManagers = watch('vendor');
  // setValue('accountManager', accountManagers?.accountManager);

  useEffect(() => {
    if (!isEditMode) {
      setValue('accountManager', accountManagers?.accountManager);
    }
  }, [accountManagers]);

  return (
    <Box>
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
          <FormInput
            name="accountManager"
            id="accountManager"
            label="Account Manager"
            disabled
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12}>
          <OfferFormAdTemplates name="template" isEditMode={isEditMode} />
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
            <OfferTypeFormSelect
              name="layoutType"
              id="bodyType"
              width="76px"
              isEditMode={isEditMode}
            />
          </Box>
          <FormInput
            type="number"
            name="subTitle"
            id="body"
            label="Offer Body"
            prefix={<Box ml={17} />}
            inputProps={{
              max: 999,
              min: 1,
            }}
            // disabled={bodyType === OfferBodyType.FREE}
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
          <FormDatePicker name="availableUntil" label="Validity Date" />
        </Grid>
        <Grid item xs={6}>
          <FormTimePicker name="validityEndTime" label="End Time" />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} mx={0.1}>
          <TextEditor
            name="usageInstructions"
            label="How to use offer"
            checkBoxEnabled
            param={LookUpCode.QUIZ_TERMS}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} mx={0.1}>
          <TextEditor
            name="termsAndConditions"
            label="Terms & Condition"
            checkBoxEnabled
            param={LookUpCode.OFFER_USAGE_INSTRUCTION}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

OfferAddEditFormFields.defaultProps = {
  isEditMode: false,
};
