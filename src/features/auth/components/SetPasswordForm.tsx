import { Box, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import uiRoute from 'shared/constants/uiRoute';
import PasswordRequirements from 'shared/components/display/PasswordRequirements';
import { SetPasswordFormSchemaType, setPasswordFormSchema } from '../schemas';
import { SetPasswordFields } from './SetPasswordFields';

interface IProps {
  onSubmitHandler: (data: SetPasswordFormSchemaType) => void;
  isLoading: boolean;
}

const defaultValues: SetPasswordFormSchemaType = {
  newPassword: '',
  confirmNewPassword: '',
};

export function SetPasswordForm({ onSubmitHandler, isLoading }: IProps) {
  const navigate = useNavigate();
  const methods = useForm<SetPasswordFormSchemaType>({
    resolver: zodResolver(setPasswordFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: SetPasswordFormSchemaType) => {
    onSubmitHandler(data);
  };

  const onBackClick = () => [navigate(uiRoute.auth.login)];

  return (
    <Box>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={8}>
          <SetPasswordFields />
          <Box mt={6}>
            <PasswordRequirements />
          </Box>
          <Stack spacing={4} mt={9}>
            <Button
              variant={ButtonVariant.CONTAINED}
              size={ButtonSize.MEDIUM}
              fullWidth
              type="submit"
              buttonType={ButtonType.LOADING}
              loading={isLoading}
            >
              Set Password
            </Button>

            <Button
              variant={ButtonVariant.TEXT}
              size={ButtonSize.MEDIUM}
              fullWidth
              prefix={<BsChevronLeft />}
              onClick={onBackClick}
            >
              Back to login
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </Box>
  );
}
