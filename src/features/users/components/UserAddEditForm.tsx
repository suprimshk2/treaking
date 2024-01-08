import { Grid } from '@mui/material';
import { FormGenderSelect } from 'shared/components/form/FormGenderSelect';
import FormInput from 'shared/components/form/FormInput';
import { FormMaskedDateInput } from 'shared/components/form/FormMaskedDateInput';
import { FormMaskedPhoneInput } from 'shared/components/form/FormMaskedPhoneInput';
import { FormRoleSelect } from 'shared/components/form/FormRoleSelect';

interface IProps {
  isEditMode?: boolean;
}

export function UserAddEditForm({ isEditMode }: IProps) {
  return (
    <>
      <Grid container spacing={4} mb={2}>
        <Grid item xs={4}>
          <FormInput name="firstName" id="firstName" label="First Name *" />
        </Grid>
        <Grid item xs={4}>
          <FormInput name="middleName" id="middleName" label="Middle Name" />
        </Grid>
        <Grid item xs={4}>
          <FormInput name="lastName" id="lastName" label="Last Name *" />
        </Grid>
      </Grid>

      <Grid container spacing={4} mb={2}>
        <Grid item xs={4}>
          <FormMaskedDateInput name="dob" id="dob" label="Date of Birth " />
        </Grid>
        <Grid item xs={4}>
          <FormGenderSelect
            name="gender"
            id="gender"
            label="Gender "
            clearable
          />
        </Grid>
        <Grid item xs={4}>
          <FormRoleSelect name="role" id="role" label="Role" clearable />
        </Grid>
      </Grid>

      <Grid container spacing={4} mb={2}>
        <Grid item xs={6}>
          <FormInput
            name="email"
            id="email"
            label="Email *"
            disabled={isEditMode}
          />
        </Grid>
        <Grid item xs={6}>
          <FormMaskedPhoneInput name="phone" id="phone" label="Phone " />
        </Grid>
      </Grid>
    </>
  );
}

UserAddEditForm.defaultProps = {
  isEditMode: false,
};
