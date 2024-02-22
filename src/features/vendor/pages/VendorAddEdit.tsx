import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, useTheme } from '@mui/material';
import {
  Button,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from 'shared/theme/components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from 'shared/theme/components/dialog';
import { DialogLoader } from 'shared/components/display/DialogLoader';

import {
  useAddVendorMutation,
  useEditVendorMutation,
  useVendorDetailQuery,
} from '../mutations';
import { VendorAddEditFields } from '../components/VendorAddEditFields';
import { formatVendorAddPayload } from '../utils';
import { AddVendorFormSchemaType, addVendorFormSchema } from '../schemas';
import { DialogSize } from 'shared/theme/components/dialog/Dialog';

interface IProps {
  editVendorId: string; // id of user which is to be edited
  onClose: VoidFunction;
}

const defaultValues = {
  images: [],
  businessName: '',
  contactsOne: '',
  contactsTwo: '',
  email: '',
  accountOwner: '',
  description: '',
  instagram: '',
  facebook: '',
  youtube: '',
  website: '',
  address: '',
  vendorEmail: '',
  phone: '',
  fullName: '',
  enrolledDate: new Date(),
};

export function VendorAddEdit({ editVendorId, onClose }: IProps) {
  const theme = useTheme();
  const addVendorMutation = useAddVendorMutation();
  const editVendorMutation = useEditVendorMutation();
  const methods = useForm({
    resolver: zodResolver(addVendorFormSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const vendorDetailQuery = useVendorDetailQuery(editVendorId ?? '', {
    enabled: !!editVendorId,
  });
  // Prepopulate the form in case of edit
  useEffect(() => {
    if (vendorDetailQuery?.data) {
      const vendorData = vendorDetailQuery.data;

      reset({
        ...vendorData,
        businessName: vendorData?.businessName || '',
        contactsOne: vendorData.phone?.[0] || vendorData?.contactsOne,
        contactsTwo: vendorData.phone?.[1] || vendorData?.contactsTwo,
        email: vendorData?.email || '',
        accountOwner: vendorData?.accountOwner?.name || '',
        description: vendorData?.description || '',
        instagram: vendorData?.socialMedias?.[1]?.url || '',
        facebook: vendorData?.socialMedias?.[0]?.url || '',
        youtube: vendorData?.socialMedias?.[3]?.url || '',
        website: vendorData?.socialMedias?.[2]?.url || '',
        address: vendorData?.address || '',
        vendorEmail: vendorData.contacts?.[0]?.email,
        phone: vendorData.contacts?.[0]?.phone,
        fullName: vendorData.contacts?.[0]?.firstName,
        enrolledDate: new Date(vendorData?.enrolledDate) || '',
      });
    }
  }, [vendorDetailQuery?.data, reset]);
  const onCloseModal = () => {
    reset(defaultValues);
    onClose();
  };
  const handleVendorEdit = (data: AddVendorFormSchemaType) => {
    const payload: any = formatVendorAddPayload(data);

    editVendorMutation.mutate(
      { id: editVendorId, data: payload },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };
  const handleVendorAdd = (data) => {
    const payload = formatVendorAddPayload(data);

    addVendorMutation.mutate(
      { data: payload },
      {
        onSuccess: () => {
          onCloseModal();
        },
      }
    );
  };
  const isEditMode = !!editVendorId;

  const onSubmit = (data) => {
    if (isEditMode) {
      handleVendorEdit(data);
    } else {
      handleVendorAdd(data);
    }
  };
  const TEXT = {
    title: isEditMode
      ? `Edit Vendor: ${vendorDetailQuery?.data?.demographic?.fullName || ''}`
      : 'Add Vendor',
    footerActionButtonText: isEditMode ? 'Update' : 'Save',
    errorTitle: isEditMode ? 'Error updating Vendor' : 'Error adding Vendor',
  };
  const childrenContainerStyle = {
    width: '100%',
    backgroundColor: theme.palette.gray.lighter,
  };
  return (
    <Dialog
      title={TEXT.title}
      handleClose={onCloseModal}
      open
      size={DialogSize.MEDIUM}
    >
      {vendorDetailQuery.isLoading ? (
        <DialogLoader />
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent sx={{ backgroundColor: theme.palette.common.white }}>
              <Box
                display="flex"
                alignContent="center"
                flexDirection="column"
                justifyContent="center"
                sx={{
                  backgroundColor: theme.palette.common.white,
                  paddingBottom: theme.spacing(10),
                }}
              >
                <VendorAddEditFields />
              </Box>
            </DialogContent>
            <DialogFooter
              primaryButtonText={TEXT.footerActionButtonText}
              primaryButtonType="submit"
              secondaryButtonText="Cancel"
              isSubmitting={
                editVendorMutation.isPending || addVendorMutation.isPending
              }
              onSecondaryButtonClick={onCloseModal}
            />
          </form>
        </FormProvider>
      )}
    </Dialog>
  );
}
