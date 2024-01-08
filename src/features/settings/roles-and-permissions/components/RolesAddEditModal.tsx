import { useForm, FormProvider } from 'react-hook-form';
import { Dialog, DialogFooter } from 'shared/theme/components/dialog';
import {
  DialogContent,
  DialogSize,
} from 'shared/theme/components/dialog/Dialog';
import { Box, Grid } from '@mui/material';
import Alert from 'shared/theme/components/Alert';
import { IError } from 'shared/interfaces/http';
import FormInput from 'shared/components/form/FormInput';
import { DialogLoader } from 'shared/components/display/DialogLoader';
import { useEffect } from 'react';
import { RolesAddEditFormSchemaType } from '../schemas';
import { useAddRoleMutation, useEditRoleMutation } from '../mutations';
import { useRoleDetailQuery } from '../queries';

interface IProps {
  editRoleId: string;
  onClose: VoidFunction;
}

const defaultValues: RolesAddEditFormSchemaType = {
  name: '',
};

export function RolesAddEditModal({ editRoleId, onClose }: IProps) {
  const methods = useForm<RolesAddEditFormSchemaType>({
    defaultValues,
  });

  const addRoleMutation = useAddRoleMutation();
  const editRoleMutation = useEditRoleMutation();

  const roleDetailQuery = useRoleDetailQuery(editRoleId, {
    enabled: !!editRoleId,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (roleDetailQuery?.data) {
      const name = roleDetailQuery?.data.name;
      reset({
        name,
      });
    }
  }, [reset, roleDetailQuery?.data]);

  const isEditMode = !!editRoleId;

  const onCloseModal = () => {
    reset(defaultValues);
    onClose();
  };

  const handleRoleAdd = (data: RolesAddEditFormSchemaType) => {
    const payload = {
      name: data.name,
    };
    addRoleMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };

  const handleRoleEdit = (data: RolesAddEditFormSchemaType) => {
    const payload = {
      name: data.name,
    };
    editRoleMutation.mutate(
      { id: editRoleId, data: payload },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };

  const onSubmit = (data: RolesAddEditFormSchemaType) => {
    if (isEditMode) {
      handleRoleEdit(data);
    } else {
      handleRoleAdd(data);
    }
  };

  const TEXT = {
    title: isEditMode
      ? `Edit Role: `
      : //   ? `Edit User: ${userDetailQuery?.data?.demographic?.fullName || ''}`
        'Add Role',
    footerActionButtonText: isEditMode ? 'Update' : 'Save',
    errorTitle: isEditMode ? 'Error updating user' : 'Error adding user',
  };

  const mutation = isEditMode ? editRoleMutation : addRoleMutation;

  return (
    <Dialog
      title={TEXT.title}
      handleClose={onCloseModal}
      open
      size={DialogSize.MEDIUM}
    >
      {roleDetailQuery.isInitialLoading ? (
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
              <Grid container width="100%">
                <Grid item xs={12}>
                  <FormInput name="name" id="name" label="Role Name" />
                </Grid>
              </Grid>
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
