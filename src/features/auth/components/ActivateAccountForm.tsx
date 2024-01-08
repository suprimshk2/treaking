import { Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { BsFillPersonFill, BsLockFill } from 'react-icons/bs';
import FormInput from 'shared/components/form/FormInput';
import FormPasswordInput from 'shared/components/form/FormPasswordInput';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  ActivateAccountFormSchemaType,
  activeAccountFormSchema,
} from '../schemas';

interface IProps {
  onSubmitHandler: (data: ActivateAccountFormSchemaType) => void;
  isLoading: boolean;
  email: string;
}

const defaultValues = {
  email: '',
  newPassword: '',
  confirmNewPassword: '',
};

function ActivateAccountForm({ onSubmitHandler, isLoading, email }: IProps) {
  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(activeAccountFormSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: ActivateAccountFormSchemaType) => {
    onSubmitHandler(data);
  };

  useEffect(() => {
    if (email) {
      methods.setValue('email', email);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormInput
            disabled
            name="email"
            id="email"
            label="Email"
            placeholder="Enter Email"
            prefix={<BsFillPersonFill />}
          />
          <FormPasswordInput
            name="newPassword"
            id="newPassword"
            label="New Password"
            placeholder="Enter New Password"
            prefix={<BsLockFill />}
          />
          <FormPasswordInput
            name="confirmNewPassword"
            id="confirmNewPassword"
            label="Confirm New Password"
            placeholder="Confirm New Password"
            prefix={<BsLockFill />}
          />
        </Stack>
        <Stack spacing={4} mt={9}>
          <Button
            variant={ButtonVariant.CONTAINED}
            size={ButtonSize.MEDIUM}
            fullWidth
            type="submit"
            buttonType={ButtonType.LOADING}
            loading={isLoading}
          >
            Continue
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}

export default ActivateAccountForm;
