/**
 * This file is just for demo
 *
 */

import { Box, IconButton, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import FormInput from 'shared/components/form/FormInput';
import FormPasswordInput from 'shared/components/form/FormPasswordInput';
import { BsFillPersonFill, BsList, BsLockFill } from 'react-icons/bs';

const formSchema = z.object({
  firstName: z.string().trim().min(1, { message: 'This is a required field' }),
  password: z.string().trim().min(1, { message: 'This is a required field' }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const defaultValues = {
  firstName: '',
  password: '',
};

function Auth() {
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormSchemaType) => {
    // eslint-disable-next-line no-console
    console.log({ data });
  };

  return (
    <Box margin="auto">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormInput
              name="firstName"
              id="first-name"
              label="First Name"
              prefix={<BsFillPersonFill />}
            />

            <FormPasswordInput
              name="password"
              id="password"
              label="Password"
              prefix={<BsLockFill />}
            />

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </FormProvider>
      <Box mt={10}>
        <IconButton aria-label="toggle-sidebar" className="filled-white">
          <BsList />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Auth;
