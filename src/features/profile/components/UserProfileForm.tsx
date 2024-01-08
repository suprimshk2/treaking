import { Box, Divider } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatUserEditPayload } from 'features/users/utils';
import { useEditUserMutation } from 'features/users/mutations';
import { unformatDate } from 'shared/utils/date';
import { useBoundStore } from 'shared/stores/useBoundStore';
import { useEffect } from 'react';
import { unformatPhone } from 'shared/utils/misc';
import { Button, ButtonSize, ButtonType } from 'shared/theme/components/Button';
import { useUserDetailQuery } from 'features/users/queries';
import { LoadingIndicator } from 'shared/components/display/LoadingIndicator';
import { UpdateProfileFields } from './UpdateProfileFields';
import { ProfileSchemaType, profileSchema } from '../schemas';

const defaultValues: ProfileSchemaType = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  gender: null,
  role: '',
  enableMFA: false,
};

function UserProfileForm() {
  const authData = useBoundStore.use.authData();
  const setAuthData = useBoundStore.use.setAuthData();
  const methods = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const { handleSubmit, setValue } = methods;
  const updateUserMutation = useEditUserMutation();
  const userDetailQuery = useUserDetailQuery(authData?.userId || '', {
    enabled: !!authData?.userId,
  });

  useEffect(() => {
    if (userDetailQuery?.data) {
      const { demographic } = userDetailQuery.data;
      const { security } = userDetailQuery.data;
      const { firstName, middleName, lastName, email, dob, gender, phone } =
        demographic;
      setValue('firstName', firstName);
      setValue('middleName', middleName);
      setValue('lastName', lastName);
      setValue('dob', unformatDate(dob || ''));
      setValue('gender', gender);
      setValue('phone', unformatPhone(phone || ''));
      setValue('email', email);
      setValue('enableMFA', security?.enableMFA ?? false);
      setValue('role', userDetailQuery.data.association?.roles?.[0] ?? '');
    }
  }, [setValue, userDetailQuery?.data]);

  const onSubmit = (data: ProfileSchemaType) => {
    if (!authData) {
      throw new Error('Auth Data not populated');
    }

    const { userId } = authData;

    const userData = formatUserEditPayload(data);
    updateUserMutation.mutate(
      {
        id: userId,
        data: userData,
      },
      {
        onSuccess: async (response) => {
          setAuthData({
            ...authData,
            fullName: response?.data.demographic.fullName,
            firstName: response?.data.demographic.firstName,
            lastName: response?.data.demographic.lastName,
            middleName: response?.data.demographic?.middleName || '',
            email: response?.data.demographic.email,
          });
        },
      }
    );
  };

  return userDetailQuery?.isLoading ? (
    <LoadingIndicator />
  ) : (
    <Box>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <UpdateProfileFields />
          <Divider
            sx={{
              mt: 4,
            }}
          />
          <Box textAlign="right">
            <Button
              sx={{ mt: 4 }}
              buttonType={ButtonType.LOADING}
              size={ButtonSize.MEDIUM}
              type="submit"
              loading={updateUserMutation.isLoading}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Box>
  );
}

export default UserProfileForm;
