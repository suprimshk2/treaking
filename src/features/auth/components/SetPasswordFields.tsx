import { Grid } from '@mui/material';

import FormPasswordInput from 'shared/components/form/FormPasswordInput';

export function SetPasswordFields() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <FormPasswordInput
          autoFocus
          id="newPassword"
          name="newPassword"
          label="Password"
        />
      </Grid>
      <Grid item xs={12}>
        <FormPasswordInput
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Confirm Password"
        />
      </Grid>
    </Grid>
  );
}
