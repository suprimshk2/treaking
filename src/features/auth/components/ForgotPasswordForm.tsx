import { Stack } from '@mui/material';

import { BsChevronLeft } from 'react-icons/bs';
import FormInput from 'shared/components/form/FormInput';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';

interface IProps {
  onBackClick: VoidFunction;
  isLoading: boolean;
}

function ForgotPasswordForm({
  onBackClick,

  isLoading,
}: IProps) {
  return (
    <>
      <Stack mt={4}>
        <FormInput
          autoFocus
          name="email"
          id="username"
          label="Email"
          placeholder="eg. jon@email.com"
          type="email"
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
    </>
  );
}

export default ForgotPasswordForm;
