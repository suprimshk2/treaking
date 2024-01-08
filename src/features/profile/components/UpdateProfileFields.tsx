import { Box, Grid, Typography } from '@mui/material';
import { FormGenderSelect } from 'shared/components/form/FormGenderSelect';
import FormInput from 'shared/components/form/FormInput';
import { FormMaskedDateInput } from 'shared/components/form/FormMaskedDateInput';
import { FormMaskedPhoneInput } from 'shared/components/form/FormMaskedPhoneInput';
import { FormSwitch } from 'shared/components/form/FormSwitch';

export function UpdateProfileFields() {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="bodyTextLargeMd">Basic Information</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormInput id="firstName" name="firstName" label="First Name *" />
        </Grid>
        <Grid item xs={3}>
          <FormInput id="middleName" name="middleName" label="Middle Name" />
        </Grid>
        <Grid item xs={3}>
          <FormInput id="lastName" name="lastName" label="Last Name *" />
        </Grid>
        <Grid item xs={6}>
          <FormMaskedDateInput name="dob" id="dob" label="Date of Birth" />
        </Grid>
        <Grid item xs={6}>
          <FormGenderSelect
            name="gender"
            id="gender"
            label="Gender"
            clearable
          />
        </Grid>
        <Grid item xs={12}>
          <Typography mt={4} variant="bodyTextLargeMd">
            Contact
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormInput id="email" name="email" label="Email *" disabled />
        </Grid>
        <Grid item xs={6}>
          <FormMaskedPhoneInput id="phone" name="phone" label="Phone" />
        </Grid>
      </Grid>
      <Grid item xs={12} mt={4}>
        <Typography variant="bodyTextLargeMd">
          Multi-factor Authentication
        </Typography>
      </Grid>
      <Grid item xs={12} mt={4} color="gray.dark">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="bodyTextMedium">
            Receive OTP via Email
          </Typography>
          <FormSwitch name="enableMFA" />
        </Box>
      </Grid>
    </Box>
  );
}
