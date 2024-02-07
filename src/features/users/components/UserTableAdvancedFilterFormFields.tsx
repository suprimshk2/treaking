import { Grid } from '@mui/material';
import FormInput from 'shared/components/form/FormInput';
import { FormMaskedPhoneInput } from 'shared/components/form/FormMaskedPhoneInput';

export function UserTableAdvancedFilterFormFields() {
  return (
    <Grid container spacing={4} mb={2}>
      <Grid item xs={6} sm={4} lg={2}>
        <FormInput name="firstName" id="firstName" label="First Name" />
      </Grid>
      <Grid item xs={6} sm={4} lg={2}>
        <FormInput name="lastName" id="lastName" label="Last Name" />
      </Grid>
      <Grid item xs={6} sm={4} lg={2}>
        <FormInput name="email" id="email" label="Email" />
      </Grid>
      <Grid item xs={6} sm={4} lg={2}>
        <FormMaskedPhoneInput
          name="mobileNumber"
          id="mobileNumber"
          label="Phone"
        />
      </Grid>
      {/* <Grid item xs={6} sm={4} lg={2}>
        <FormStateSelect name="state" id="state" label="State" />
      </Grid>
      <Grid item xs={6} sm={4} lg={2}>
        <FormMaskedZipInput name="zipcode" id="zipcode" label="Zip" />
      </Grid> */}
    </Grid>
  );
}
