import { Stack, Box, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BsFillPersonFill, BsLockFill } from 'react-icons/bs';
import FormInput from 'shared/components/form/FormInput';
import FormPasswordInput from 'shared/components/form/FormPasswordInput';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { useEffect } from 'react';
import { isEmpty } from 'shared/utils/lodash';
import { FormCheckbox } from 'shared/components/form/FormCheckbox';
import Link from 'shared/theme/components/Link';
import uiRoute from 'shared/constants/uiRoute';
import { loginFormSchema, LoginFormSchemaType } from '../schemas';
import { ILoginData } from '../interfaces';

interface IProps {
  initialValues: ILoginData;
  onSubmitHandler: (data: LoginFormSchemaType) => void;
  isLoading: boolean;
}

const defaultValues: LoginFormSchemaType = {
  identifier: '',
  password: '',
};

function LoginForm({ onSubmitHandler, isLoading, initialValues }: IProps) {
  const methods = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  // Populate initial values
  useEffect(() => {
    if (!isEmpty(initialValues)) {
      reset({
        identifier: initialValues.username,
        password: initialValues.password,
      });
    }
  }, [initialValues, reset]);

  const onSubmit = (data: LoginFormSchemaType) => {
    onSubmitHandler(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormInput
            name="identifier"
            id="username"
            label="Username"
            placeholder="Enter Username"
            prefix={<BsFillPersonFill size={16} />}
          />
          <FormPasswordInput
            name="password"
            id="password"
            label="Password"
            placeholder="Enter Password"
            prefix={<BsLockFill size={16} />}
          />
        </Stack>
        <Stack
          mt={6}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <FormCheckbox label="Remember me" name="keepLoggedIn" sizeSmall />
          <Link to={uiRoute.auth.forgotPassword}>
            <Typography variant="bodyTextMedium">Forgot Password?</Typography>
          </Link>
        </Stack>
        <Box paddingTop={8}>
          <Button
            type="submit"
            buttonType={ButtonType.LOADING}
            size={ButtonSize.MEDIUM}
            loading={isLoading}
            variant={ButtonVariant.CONTAINED}
            fullWidth
          >
            Login
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
