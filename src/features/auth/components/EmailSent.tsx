import { Stack, Typography, Box } from '@mui/material';
import { BsCheckCircle, BsChevronLeft } from 'react-icons/bs';
import { useFormContext } from 'react-hook-form';
import {
  Button,
  ButtonSize,
  ButtonVariant,
} from 'shared/theme/components/Button';
import uiRoute from 'shared/constants/uiRoute';
import { useNavigate } from 'react-router-dom';

export function EmailSent() {
  const navigate = useNavigate();
  const { watch } = useFormContext();

  const email = watch('email');

  const onBackClick = () => [navigate(uiRoute.auth.login)];

  return (
    <>
      <Stack textAlign="center" spacing={4} alignItems="center">
        <Box component={BsCheckCircle} size={32} color="success.main" />
        <Typography variant="h6">Email Sent</Typography>
        <Typography variant="bodyTextMedium">
          We’ve sent an email to
          <Typography
            color="primary.main"
            sx={{
              textDecoration: 'underline',
            }}
          >
            {email}
          </Typography>
          Please check your email and follow the instructions to reset your
          password
        </Typography>
      </Stack>
      <Button
        sx={{
          mt: 8,
        }}
        variant={ButtonVariant.TEXT}
        size={ButtonSize.MEDIUM}
        fullWidth
        prefix={<BsChevronLeft />}
        onClick={onBackClick}
      >
        Back to login
      </Button>
    </>
  );
}
