import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from 'shared/theme/components/dialog';
import { DialogSize } from 'shared/theme/components/dialog/Dialog';
import { FormProvider, useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import Alert from 'shared/theme/components/Alert';
import { IError } from 'shared/interfaces/http';
import { useEffect } from 'react';
import { unformatPhone } from 'shared/utils/misc';
import { unformatDate } from 'shared/utils/date';
import { DialogLoader } from 'shared/components/display/DialogLoader';
import { userAddEditFormSchema, UserAddEditFormSchemaType } from '../schemas';
import { UserAddEditForm } from './UserAddEditForm';
import { formatUserAddPayload, formatUserEditPayload } from '../utils';
import { useAddUserMutation, useEditUserMutation } from '../mutations';
import { useUserDetailQuery } from '../queries';

interface IProps {
  editUserId: string; // id of user which is to be edited
  onClose: VoidFunction;
}

const defaultValues: UserAddEditFormSchemaType = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  gender: null,
  dob: '',
  mobileNumber: '',
  role: '',
};

export function UserAddEditModal({ editUserId, onClose }: IProps) {
  const methods = useForm<UserAddEditFormSchemaType>({
    resolver: zodResolver(userAddEditFormSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const isEditMode = !!editUserId;

  const userDetailQuery = useUserDetailQuery(editUserId, {
    enabled: !!editUserId,
  });

  // Prepopulate the form in case of edit
  useEffect(() => {
    if (userDetailQuery?.data) {
      const { demographic } = userDetailQuery.data;
      reset({
        firstName: demographic.firstName || '',
        middleName: demographic.middleName || '',
        lastName: demographic.lastName || '',
        email: demographic.email || '',
        gender: demographic.gender || null,
        dob: unformatDate(demographic.dob),
        mobileNumber: unformatPhone(demographic.mobileNumber),
        role: userDetailQuery?.data?.association?.roles?.[0] || '',
      });
    }
  }, [userDetailQuery?.data, reset]);

  const addUserMutation = useAddUserMutation();
  const editUserMutation = useEditUserMutation();

  const onCloseModal = () => {
    reset(defaultValues);
    onClose();
  };

  const handleUserAdd = (data: UserAddEditFormSchemaType) => {
    const payload = formatUserAddPayload(data);

    addUserMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };

  const handleUserEdit = (data: UserAddEditFormSchemaType) => {
    const payload = formatUserEditPayload(data);

    editUserMutation.mutate(
      { id: editUserId, data: payload },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };

  const onSubmit = (data: UserAddEditFormSchemaType) => {
    if (isEditMode) {
      handleUserEdit(data);
    } else {
      handleUserAdd(data);
    }
  };

  const TEXT = {
    title: isEditMode
      ? `Edit User: ${userDetailQuery?.data?.demographic?.fullName || ''}`
      : 'Add User',
    footerActionButtonText: isEditMode ? 'Update' : 'Save',
    errorTitle: isEditMode ? 'Error updating user' : 'Error adding user',
  };

  const mutation = isEditMode ? editUserMutation : addUserMutation;

  return (
    <Dialog
      title={TEXT.title}
      handleClose={onCloseModal}
      open
      size={DialogSize.MEDIUM}
    >
      {userDetailQuery.isInitialLoading ? (
        <DialogLoader />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              {mutation.isError && (
                <Box mb={8}>
                  <Alert
                    type="error"
                    title={TEXT.errorTitle}
                    description={(mutation.error as IError)?.message}
                  />
                </Box>
              )}
              <UserAddEditForm isEditMode={isEditMode} />
            </DialogContent>
            <DialogFooter
              primaryButtonText={TEXT.footerActionButtonText}
              primaryButtonType="submit"
              secondaryButtonText="Cancel"
              isSubmitting={mutation.isPending}
              onSecondaryButtonClick={onCloseModal}
            />
          </form>
        </FormProvider>
      )}
    </Dialog>
  );
}
