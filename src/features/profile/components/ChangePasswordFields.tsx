import { Box, Grid, Stack } from '@mui/material';
import PasswordRequirements from 'shared/components/display/PasswordRequirements';

import FormPasswordInput from 'shared/components/form/FormPasswordInput';
import { ButtonSize, ButtonType, Button } from 'shared/theme/components/Button';

export function ChangePasswordFields({ isLoading }: { isLoading: boolean }) {
  return (
    <Stack spacing={4}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <FormPasswordInput
            id="oldPassword"
            name="oldPassword"
            label="Old Password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormPasswordInput
            id="newPassword"
            name="newPassword"
            label="New Password"
          />
        </Grid>
        <Grid item xs={12}>
          <FormPasswordInput
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
          />
        </Grid>
      </Grid>

      <PasswordRequirements />

      <Box textAlign="right">
        <Button
          buttonType={ButtonType.LOADING}
          size={ButtonSize.MEDIUM}
          type="submit"
          loading={isLoading}
        >
          Change Password
        </Button>
      </Box>
    </Stack>
  );
}
